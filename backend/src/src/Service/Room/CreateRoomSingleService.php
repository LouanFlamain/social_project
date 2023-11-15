<?php
namespace App\Service\Room;

use App\Entity\Room;
use App\Repository\RoomRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use ErrorException;
use App\Entity\User;

class CreateRoomSingleService{
    private $entityManager;
    private $roomRepository;
    private $JwtExtractEmail;

    public function __construct(EntityManagerInterface $entityManager, RoomRepository $roomRepository,JwtExtractEmail $JwtExtractEmail )
    {
        $this->entityManager = $entityManager;
        $this->roomRepository = $roomRepository;
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

        $room = new Room();
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
        
        /*vérifie si la room existe déjà*/
        $existing_room = $this->roomRepository->findUsersArrayByUserId($usersId[0], $usersId[1]);
        if($existing_room){
            return[
                "code" => 409,
                "message" => "cette discussion existe déjà"
            ];
        }

        //set la room

        $date = new DateTimeImmutable();

        $room->setLastMessageDate($date)
        ->setLastMessageValue($lastMessageValue)
        ->setUsers($usersArray)
        ->setGroups(false);

        try {
            $this->entityManager->persist($room);
            $this->entityManager->flush();
            return [
                'code' => 200,
                'message' => 'Conversation crée'
            ];
        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "la création de l'utilisateur a échoue",
                'error' => $e->getMessage()
            ];
        }
    }
}