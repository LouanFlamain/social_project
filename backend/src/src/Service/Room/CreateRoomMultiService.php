<?php
namespace App\Service\Room;

use App\Entity\Room;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use App\Service\User\VerifyUserService;
use ErrorException;
use App\Entity\User;

class CreateRoomMultiService{
    private $entityManager;
    private $JwtExtractEmail;
    private $verifyUserService;

    public function __construct(EntityManagerInterface $entityManager, JwtExtractEmail $JwtExtractEmail, VerifyUserService $verifyUserService )
    {
        $this->entityManager = $entityManager;
        $this->JwtExtractEmail = $JwtExtractEmail;
        $this->verifyUserService = $verifyUserService;
    }

    public function createRoom($data, $jwt){
        $usersId = $data['users'];
        $lastMessageValue = $data['message_value'];
        if(empty($usersId) || empty($lastMessageValue)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }
        $usersArray = json_encode($usersId);

        //vérifie si l'email du créateur de conv correspond bien à l'email du jwt
        $userVerification = $this->verifyUserService->verifyUser($usersId[0], $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }

        //vérifie que les utilisateurs existent en bdd

        $userRepository = $this->entityManager->getRepository(User::class);
        foreach($usersId as $utilisateur){
            $check_bdd = $userRepository->find($utilisateur);
            if($check_bdd == NULL){
                return[
                    "code" => 400,
                    "message" => "les id utilisateurs ne correspondent pas à un utilisateur"
                ];
            }
        }

        $room = new Room();

        //set la room

        $date = new DateTimeImmutable();

        $room->setLastMessageDate($date)
        ->setLastMessageValue($lastMessageValue)
        ->setUsers($usersArray)
        ->setGroups(true);

        try {
            $this->entityManager->persist($room);
            $this->entityManager->flush();
            return [
                'code' => 200,
                'message' => 'Groupe crée'
            ];
        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "la création du groupe a échoue",
                'error' => $e->getMessage()
            ];
        }
    }
}