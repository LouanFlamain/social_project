<?php
namespace App\Service\Room;

use App\Entity\Room;
use Doctrine\ORM\EntityManagerInterface;
use ErrorException;
use App\Entity\User;
use App\Service\VerifyUserService;


class AddUserToRoom{
    private $entityManager;
    private $verifyUserService;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService)
    {
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
    }
    public function addUser($data, $jwt){
        $request_user = $data['request_user'];
        $userVerification = $this->verifyUserService->verifyUser($request_user, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }
    }
   
}