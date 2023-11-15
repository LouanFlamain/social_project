<?php
namespace App\Service\Room;

use App\Entity\Room;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use ErrorException;
use App\Entity\User;

class CreateRoomMultiService{
    private $entityManager;
    private $JwtExtractEmail;

    public function __construct(EntityManagerInterface $entityManager, JwtExtractEmail $JwtExtractEmail )
    {
        $this->entityManager = $entityManager;
        $this->JwtExtractEmail = $JwtExtractEmail;
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
        $email_extract = $this->JwtExtractEmail->extractInformations($jwt);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($usersId[0]);
        $userEmail = $user->getEmail();
        if (!$userEmail) {
            throw new ErrorException("aucun email associé à l'id ". $usersId[0]);
        }

        if($email_extract !== $userEmail){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }

        //vérifie que les utilisateurs existent en bdd

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