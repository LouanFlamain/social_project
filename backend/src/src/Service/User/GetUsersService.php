<?php

namespace App\Service\User;

use Doctrine\ORM\EntityManagerInterface;
use App\Service\User\VerifyUserService;
use App\Entity\User;
use App\Repository\RoomRepository;

class GetUsersService
{
    private $entityManager;
    private $verifyUserService;
    private $roomRepository;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService, RoomRepository $roomRepository)
    {
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
        $this->roomRepository = $roomRepository;
    }

    public function getUsers($data, $jwt)
    {
        $excludeUserId = $data['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);



        try {
            $users = $userRepository->createQueryBuilder('u')
                ->where('u.id != :excludeUserId')
                ->setParameter('excludeUserId', $excludeUserId)
                ->getQuery()
                ->getResult();

            $userArray = [];
            foreach ($users as $user) {
                // Build an array with the user information you want to include
                $userArray[] = [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'username' => $user->getUsername(),
                ];
            }



            return [
                'code' => 200,
                'users' => $userArray,
            ];
        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "Failed to fetch users",
                'error' => $e->getMessage(),
            ];
        }
    }
}