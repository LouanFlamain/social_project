<?php
namespace App\Service\Room;

use App\Entity\Room;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use ErrorException;
use App\Entity\User;

class AddUserToRoom{
    private $entityManager;
    private $JwtExtractEmail;

    public function __construct(EntityManagerInterface $entityManager, JwtExtractEmail $JwtExtractEmail )
    {
        $this->entityManager = $entityManager;
        $this->JwtExtractEmail = $JwtExtractEmail;
    }
    public function addUser($data, $jwt){
        $request_user = $data['request_user'];

    }
   
}