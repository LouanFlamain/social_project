<?php

namespace App\Service\Room;

use Doctrine\ORM\EntityManagerInterface;
use App\Service\VerifyUserService;
use App\Entity\Room;
use App\Repository\RoomRepository;

class UpdateRoomNameService{

    private $entityManager;
    private $verifyUserService;
    private $roomRepository;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService, RoomRepository $roomRepository){
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
        $this->roomRepository = $roomRepository;
    }
    public function updateRoomName($data, $jwt){
        $roomId = $data['room_id'];
        $requestUser = $data['request_user'];
        $roomName = $data['room_name'];

        if(empty($roomId) || empty($requestUser) || empty($roomName)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }

        $userVerification = $this->verifyUserService->verifyUser($requestUser, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }

        $room_repository = $this->entityManager->getRepository(Room::class);
        $room = $room_repository->find($roomId);
        $room_state = $room->getGroups();
        $oldRoomName = $room->getName();
        if(!$room_state){
            return[
                "code" => 400,
                "message" => "impossible de changer le nom car ce n'est pas un groupe"
            ];
        }

        $userCheck = $this->roomRepository->verifyUserInRoomByUserId($requestUser, $roomId);
        if(count($userCheck) == 0){
            return[
                "code" => 404,
                "message" => "l'émeteur de la requête ne fait pas partie du groupe"
            ];
        }

        $room->setName($roomName);

        try {
            $this->entityManager->persist($room);
            $this->entityManager->flush();
            return [
                'code' => 200,
                'message' => $oldRoomName . " devient désormais " . $roomName
            ];
        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "l'ajout d'utilisateurs a échoue",
                'error' => $e->getMessage()
            ];
        }
    }
}