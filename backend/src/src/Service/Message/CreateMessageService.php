<?php 

namespace App\Service\Message;

use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\User\VerifyUserService;
use App\Entity\Message;
use App\Entity\Room;
use App\Service\CryptMessageService;
use DateTimeImmutable;

class CreateMessageService{

    private $entityManager;
    private $verifyUserService;
    private $roomRepository;
    private $cryptMessage;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService, RoomRepository $roomRepository, CryptMessageService $cryptMessage){
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
        $this->roomRepository = $roomRepository;
        $this->cryptMessage = $cryptMessage;
    }

    public function createMessage($data, $jwt){
        $userId = $data["user_id"];
        $roomId = $data['room_id'];
        $messageValue = $data['message_value'];

        if(empty($userId) || empty($roomId) || empty($messageValue)){
            return [
                "code" => 400,
                "message" => "champs manquants"
            ];
        }

        //vérifie si l'email du créateur du message correspond bien à l'email du jwt
        $userVerification = $this->verifyUserService->verifyUser($userId, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }

        //vérifie que le créateur du message fait bien partie de la room

        $userCheck = $this->roomRepository->verifyUserInRoomByUserId($userId, $roomId);
        if(count($userCheck) === 0){
            return[
                "code" => 400,
                "message" => "le créateur du message ne fait pas partie de la room"
            ];
        }

        //crypt le message
        
        $cryptedMessage = $this->cryptMessage->encryptMessage($messageValue);


        $message = new Message();
        $date = new DateTimeImmutable();

        $message->setValue($cryptedMessage)
        ->setUserId($userId)
        ->setRoomId($roomId)
        ->setCreatedAt($date)
        ->setIsDelete(false)
        ->setIsImage(false);

        try {
            $this->entityManager->persist($message);
            $this->entityManager->flush();

            //mets à jour le dernier message de la room

            $roomRepository = $this->entityManager->getRepository(Room::class);
            $room = $roomRepository->find($roomId);
            $room->setLastMessageValue($cryptedMessage)
            ->setLastMessageDate($date);
            try{
                $this->entityManager->persist($room);
                $this->entityManager->flush();

                return[
                    "code" => 200,
                    "message" => "message envoyé"
                ];
            } catch (\Exception $e) {
                return [
                    'code' => 400,
                    'error' => $e->getMessage()
                ];
            }

        } catch (\Exception $e) {
            return [
                'code' => 400,
                'message' => "la création du message a échoue",
                'error' => $e->getMessage()
            ];
        }

    }
}