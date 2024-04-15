<?php

namespace App\Service\User;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class SearchUsersService{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;   
    }
    public function searchUser($username){
        if(empty($username)){
            return [
                "code" => 400,
                "message" => "empty"
            ];
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findUsersByUsernameLike($username);
        $usersArray = [];
        foreach($users as $user){
            array_push($usersArray, [
                "username" => $user->getUsername(),
                "user_id" => $user->getId(),
                "user_image" => $user->getImageProfile()
            ]);
        }
        if($usersArray == []){
            return[
                "code" => 400,
                "message" => "aucun utilisateur correspondant"
            ];
        }

        return[
            "code" => 200,
            "data" => $usersArray
        ];
    }
}