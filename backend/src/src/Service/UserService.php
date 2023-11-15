<?php
namespace App\Service;

use App\Entity\User;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

class UserService{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createUser($data){
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        $check_password = $data['check_password'];
        if(empty($username) || empty($email) || empty($password) || empty($check_password)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }
        if($password !== $check_password){
            return [
                "code" => 400,
                "message" => "Les mots de passes sont différents"
            ];
        };
        $user = new User();
        $date = new DateTimeImmutable();
        $role = ['ROLE_USER'];
        $image = 'image';

        $user->setUsername($username)
        ->setEmail($email)
        ->setPassword($password)
        ->setCreatedAt($date)
        ->setRoles($role)
        ->setImageProfile($image);

        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return [
                'code' => 200,
                'message' => 'Utilisateur crée'
            ];
        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "l'utilisateur existe déjà",
                'error' => $e->getMessage()
            ];
        }
    }
}