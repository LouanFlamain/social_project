<?php

namespace App\Service\User;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class UserInformationService{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
     $this->entityManager = $entityManager;   
    }
    public function getPrivateInformations($email){
        if(empty($email)){
            return [
                "code" => 400,
                "message" => "error"
            ];
        }
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneByEmail($email);

         $response =  [
            "code" => 200,
            "data" => [
                "email" => $email,
                "username" => $user->getUsername(),
                "creation_date" => $user->getCreatedAt(),
                "role" => $user->getRoles(),
                "id" => $user->getId(),
                "image" => $user->getImageProfile()
            ]
        ];
        return $response;
    }
}