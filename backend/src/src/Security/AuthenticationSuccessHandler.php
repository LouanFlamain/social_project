<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

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
        $email = $token->getUserIdentifier();
        $jwtToken = $this->JWTManager->create($token->getUser());

        $userRepo = $this->entityManager->getRepository(User::class);
        /** @var User|null $user */
        $user = $userRepo->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['success' => false, 'message' => 'User not found']);
        }

        $response = new JsonResponse([
            'success' => true,
            'token' => $jwtToken,
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'creation_date' => $user->getCreatedAt(),
            'role' => $user->getRoles(),
            'id' => $user->getId(),
            'image' => $user->getImageProfile()
        ]);

        return $response;
    }
}
