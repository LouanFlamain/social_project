<?php
namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use App\Entity\User;
use ErrorException;

class VerifyUserService {
    private $entityManager;
    private $JwtExtractEmail;

    public function __construct(EntityManagerInterface $entityManager, JwtExtractEmail $JwtExtractEmail)
    {
        $this->entityManager = $entityManager;
        $this->JwtExtractEmail = $JwtExtractEmail;
    }
    public function verifyUser($id, $jwt){
        $email_extract = $this->JwtExtractEmail->extractInformations($jwt);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($id);
        $userEmail = $user->getEmail();
        if (!$userEmail) {
            throw new ErrorException("aucun email associé à l'id ". $id);
        }

        if($email_extract !== $userEmail){
            return false;
        }else{
            return true;
        }
    }
}
