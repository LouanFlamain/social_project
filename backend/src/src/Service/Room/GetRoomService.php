<?php
namespace App\Service\Room;

use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\JwtExtractEmail;
use ErrorException;
use App\Entity\User;
use App\Service\CryptMessageService;

class GetRoomService{
    private $entityManager;
    private $roomRepository;
    private $JwtExtractEmail;
    private $cryptMessage;

    public function __construct(EntityManagerInterface $entityManager, RoomRepository $roomRepository,JwtExtractEmail $JwtExtractEmail, CryptMessageService $cryptMessage )
    {
        $this->entityManager = $entityManager;
        $this->roomRepository = $roomRepository;
        $this->JwtExtractEmail = $JwtExtractEmail;
        $this->cryptMessage = $cryptMessage;
    }

    public function getRooms($data, $jwt){
        $userId = $data['user_id'];
        if(empty($userId)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }
        //vérifie si l'email du créateur de conv correspond bien à l'email du jwt
        $email_extract = $this->JwtExtractEmail->extractInformations($jwt);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($userId);
        $userEmail = $user->getEmail();
        if (!$userEmail) {
            throw new ErrorException("aucun email associé à l'id ". $userId);
        }
        
        if($email_extract !== $userEmail){
            return[
                "code" => 404,
                "message" => "failed load rooms"
            ];
        }
        try{
            $rooms = $this->roomRepository->findRoomsByUserId($userId);

            //tableau retourné par la function

            $room_array = [];

            //boucle pour chaque rooms correspondant à l'id utilisateur

            foreach($rooms as $room){

                // pour avoir la journée

                $date = $room->getLastMessageDate();
                $timestamp = $date->getTimestamp();
                $room_day_fr = "";
                $room_day_message = $room->getLastMessageDate()->format("l");
                switch($room_day_message){
                    case "Monday" : 
                        $room_day_fr = "Lundi";
                        break;
                    case "Tuesday" :
                        $room_day_fr = "Mardi";
                        break;
                    case "Wednesday" :
                        $room_day_fr = "Mercredi";
                        break;
                    case "Thursday" : 
                        $room_day_fr = "Jeudi";
                        break;
                    case "Friday" :
                        $room_day_fr = "Vendredi";
                        break;
                    case "Saturday" :
                        $room_day_fr = "Samedi";
                        break;
                    case "Sunday" :
                        $room_day_fr = "Sunday";
                        break;
                }

                //users

                $users = json_decode($room->getUsers());

                //nom de la conv

                $room_group = $room->getGroups();
                $room_name = '';

                //nom des utilisatateurs dans le cas ou name du group == null

                $room_users = [];

                if(!$room_group){
                    foreach($users as $user){
                        if($user !== $userId){
                            $userQuery = $userRepository->find($user);
                            $username = $userQuery->getUsername();
                            $room_name = $username;
                            array_push($room_users, $username);
                        }
                    }
                }
                if($room_group){
                    $group_name = $room->getName();
                    if($group_name !== null){
                        $room_name = $group_name;
                    }else{
                        foreach($users as $user){
                            if($user !== $userId){
                                $userQuery = $userRepository->find($user);
                                $username = $userQuery->getUsername();
                                array_push($room_users, $username);
                            }
                        }
                        $room_name = implode(", ", $room_users);
                    }
                }

                //decrypt le message
                $crypted_message = $room->getLastMessageValue();
                $decrypted_message = $this->cryptMessage->decryptMessage($crypted_message);

                $room_data = [
                    "id" => $room->getId(),
                    "room_name" => $room_name,
                    "users_id" => $users,
                    'usernames' => implode(", ", $room_users),
                    "multi_participant" => $room->getGroups(),
                    "last_message_value" => $decrypted_message,
                    "time" => [
                        "last_message_date" => $room->getLastMessageDate()->format("Y-m-d"),
                        "last_message_hour" => $room->getLastMessageDate()->format("H:i"),
                        "last_message_day" => $room_day_fr,
                        "timestamp" => $timestamp
                    ]
                ];
                array_push($room_array, $room_data);
            }
            usort($room_array, function($a, $b) {
                return $b['time']['timestamp'] <=> $a['time']['timestamp'];
            });
            return[
                'code' => 200,
                'data' => $room_array
            ];
        }catch(\Exception $e){
            return [
                'code' => 400,
                'message' => "impossible de get les rooms",
                'error' => $e->getMessage()
            ];
        }
    }
    public function getUniqueRoomMercure($roomId, $userId){
        /*if(empty($userId) || empty($roomId)){
            return [
                "code" => 400,
                "message" => "Champs manquants"
            ];
        }
    
        $email_extract = $this->JwtExtractEmail->extractInformations($jwt);*/
        $userRepository = $this->entityManager->getRepository(User::class);
        /*$user = $userRepository->find($userId);
        $userEmail = $user->getEmail();
        if (!$userEmail) {
            throw new ErrorException("Aucun email associé à l'id " . $userId);
        }
        
        if($email_extract !== $userEmail){
            return[
                "code" => 404,
                "message" => "Échec du chargement de la room"
            ];
        }*/
    
        try {
            $room = $this->roomRepository->find($roomId);
            if (!$room) {
                return [
                    "code" => 404,
                    "message" => "Room non trouvée"
                ];
            }
    
            // Traitement pour obtenir les détails de la room
            $date = $room->getLastMessageDate();
            $timestamp = $date->getTimestamp();
            $room_day_fr = $this->getDayInFrench($date->format("l"));
    
            $users = json_decode($room->getUsers());
            $room_group = $room->getGroups();
            $room_name = '';
            $room_users = [];
    
            if(!$room_group){
                foreach($users as $user){
                    if($user !== $userId){
                        $userQuery = $userRepository->find($user);
                        $username = $userQuery->getUsername();
                        $room_name = $username;
                        array_push($room_users, $username);
                    }
                }
            }
    
            if($room_group){
                $group_name = $room->getName();
                if($group_name !== null){
                    $room_name = $group_name;
                } else {
                    foreach($users as $user){
                        if($user !== $userId){
                            $userQuery = $userRepository->find($user);
                            $username = $userQuery->getUsername();
                            array_push($room_users, $username);
                        }
                    }
                    $room_name = implode(", ", $room_users);
                }
            }
    
            $crypted_message = $room->getLastMessageValue();
            $decrypted_message = $this->cryptMessage->decryptMessage($crypted_message);
    
            $roomDetails = [
                "id" => $room->getId(),
                "room_name" => $room_name,
                "users_id" => $users,
                'usernames' => implode(", ", $room_users),
                "multi_participant" => $room->getGroups(),
                "last_message_value" => $decrypted_message,
                "time" => [
                    "last_message_date" => $room->getLastMessageDate()->format("Y-m-d"),
                    "last_message_hour" => $room->getLastMessageDate()->format("H:i"),
                    "last_message_day" => $room_day_fr,
                    "timestamp" => $timestamp
                ]
            ];
    
            return [
                "code" => 200,
                "data" => $roomDetails
            ];
        } catch(\Exception $e) {
            return [
                "code" => 500,
                "message" => "Erreur interne",
                "error" => $e->getMessage()
            ];
        }
    }
    
    private function getDayInFrench($day) {
        $days = [
            "Monday" => "Lundi",
            "Tuesday" => "Mardi",
            "Wednesday" => "Mercredi",
            "Thursday" => "Jeudi",
            "Friday" => "Vendredi",
            "Saturday" => "Samedi",
            "Sunday" => "Dimanche"
        ];
        return $days[$day] ?? $day;
    }
    
    public function getUniqueRoom($roomId, $userId, $jwt){
        if(empty($userId) || empty($roomId)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }

        $email_extract = $this->JwtExtractEmail->extractInformations($jwt);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($userId);
        $userEmail = $user->getEmail();
        if (!$userEmail) {
            throw new ErrorException("aucun email associé à l'id ". $userId);
        }
        
        if($email_extract !== $userEmail){
            return[
                "code" => 404,
                "message" => "failed load rooms"
            ];
        }

        try{
            $usersArray = [];

            $room = $this->roomRepository->find($roomId);
            $userRepository = $this->entityManager->getRepository(User::class);
            $roomUsers = $room->getUsers();
            foreach(json_decode($roomUsers) as $roomUser){
                if($roomUser != $userId){
                $user = $userRepository->find($roomUser);
                $username = $user->getUsername();
                $image = $user->getImageProfile();
                
                $userData = array(
                    "username" => $username,
                    "user_id" => $roomUser,
                    "image" => $image
                );
                array_push($usersArray, $userData);
            }

            }
            return [
                "code" => 200,
                "data" => $usersArray
            ];
        }catch(\ErrorException $e){
            return[
                "code" => 404,
                "message" => "failed load room"
            ];
        }        
        
    }
}