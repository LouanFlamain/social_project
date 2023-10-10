<?php
namespace App\Service\Room;

use App\Entity\Room;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\User\VerifyUserService;
use App\Repository\RoomRepository;


class AddUserToRoom{
    private $entityManager;
    private $verifyUserService;
    private $roomRepository;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService, RoomRepository $roomRepository)
    {
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
        $this->roomRepository = $roomRepository;
    }
    public function addUser($data, $jwt){
        $request_user = $data['request_user'];
        $room_id = $data['room_id'];
        $new_users = $data['add'];

        if(empty($request_user) || empty($room_id) || empty($new_users)){
            return[
                "code" => 400,
                "message" => "champs manquants"
            ];
        }

        //vérifie que l'utilisateur fait partie de la room
        $userCheck = $this->roomRepository->verifyUserInRoomByUserId($request_user, $room_id);
        if(count($userCheck) == 0){
            return[
                "code" => 404,
                "message" => "l'émeteur de la requête ne fait pas partie du groupe"
            ];
        }

        $userVerification = $this->verifyUserService->verifyUser($request_user, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }
        $room_repository = $this->entityManager->getRepository(Room::class);
        $room = $room_repository->find($room_id);
        /*vérifie si c'est une discussion ou un groupe
        $roomState = $room->getGroups();
        dd($roomState);*/
        //if($roomState){
            $users = json_decode($room->getUsers());
            
            //pour chaque utilisateur on vérifie si il fait partie de la room
            foreach($new_users as $new_user){
                $userCheck = $this->roomRepository->verifyUserInRoomByUserId($new_user, $room_id);
                if(count($userCheck) === 0){
                    array_push($users, $new_user);
                }
            }
            $users = json_encode($users);
            $room->setUsers($users);
            try {
                $this->entityManager->persist($room);
                $this->entityManager->flush();
                return [
                    'code' => 200,
                    'message' => 'Utilisateurs ajoutés'
                ];
            } catch (\Exception $e) {
                return [
                    'code' => 400,
                    'message' => "l'ajout d'utilisateurs a échoue",
                    'error' => $e->getMessage()
                ];
            }
        //}
    }
   
}