<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Cookie;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class AuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private $JWTManager;
    private $entityManager;

    public function __construct(JWTTokenManagerInterface $JWTManager, EntityManagerInterface $entityManager)
    {
        $this->JWTManager = $JWTManager;
        $this->entityManager = $entityManager;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token) : JsonResponse
    {
        /** @var UserInterface $user */
        $userToken = $token->getUser();
        $jwtToken = $this->JWTManager->create($userToken);

        $email = $token->getUserIdentifier();

        $repository = $this->entityManager->getRepository(User::class);
        $qb = $repository->createQueryBuilder('p');
        $qb->select('p')
        ->where('p.email = :email')
        ->setParameter('email', $email);

        $user = $qb->getQuery()->getOneOrNullResult();
        $username = $user->getUsername();
        $createAt = $user->getCreatedAt();
        $role = $user->getRoles();

        $response = new JsonResponse([
            'success' => true,
            'token' => $jwtToken,
            'email' => $email,
            'username' => $username,
            'creation_date' => $createAt,
            'role' => $role
        ]);


        /*$cookie = new Cookie(
            'BEARER',
            $jwtToken,
            //3600
        );

        $cookie2 = new Cookie(
            'BEARER',              // Nom du cookie
            $jwtToken,             // Valeur du cookie
            3600,                  // tps
            '/',                   // chemin
            null,                  // domaine
            false,                 // sécurisé
            true,                  // httpOnly
            false,  
            null               // pour URL-encoder la valeur du cookie, pas nécessaire ici
            //Cookie::SAMESITE_NONE  // SameSite 
        );
    $response->headers->setCookie($cookie);
    //$response->headers->set('Set-Cookie', "BEARER=".$jwtToken);*/

        return $response;
    }
}
