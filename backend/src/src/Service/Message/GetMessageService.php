<?php

namespace App\Service\Message;

use App\Repository\MessageRepository;
use App\Repository\RoomRepository;
use App\Service\User\VerifyUserService;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\CryptMessageService;
use App\Entity\User;

class GetMessageService
{
    private $entityManager;
    private $verifyUserService;
    private $roomRepository;
    private $messageRepository;
    private $cryptMessage;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService, RoomRepository $roomRepository, MessageRepository $messageRepository, CryptMessageService $cryptMessage)
    {
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
        $this->roomRepository = $roomRepository;
        $this->messageRepository = $messageRepository;
        $this->cryptMessage = $cryptMessage;
    }
    public function getMessage($data, $jwt)
    {
        $userId = $data['user_id'];
        $roomId = $data['room_id'];
        $offset = $data['offset'];


        //vérifie si champs manquants

        if (empty($userId) || empty($roomId)) {
            return [
                "code" => 400,
                "message" => "champs manquant"
            ];
        }

        //vérifie si le user connecté est bien le bon

        $userVerification = $this->verifyUserService->verifyUser($userId, $jwt);
        if (!$userVerification) {
            return [
                "code" => 404,
                "message" => "la personne connecté et le créateur de la room ne sont pas les mêmes"
            ];
        }

        //vérifie si le user fait partie de la room

        $userCheck = $this->roomRepository->verifyUserInRoomByUserId($userId, $roomId);
        if (count($userCheck) === 0) {
            return [
                "code" => 400,
                "message" => "le créateur du message ne fait pas partie de la room"
            ];
        }

        //get les messages

        $messages = $this->messageRepository->getMessageByRoomId($roomId, $offset);

        //reste à faire la logique de rendu

        //dd($messages);
        $message_response = [];
        $userRepository = $this->entityManager->getRepository(User::class);

        $room = $this->roomRepository->find($roomId);

        $room_object = [
            "id" => $room->getId(),
            "name" => $room->getName(),
        ];

        foreach ($messages as $message) {
            $message_is_deleted = $message->isIsDelete();
            //si le message est supprimé alors ça ne renvoie rien
            if (!$message_is_deleted) {
                //decrypt le msg
                $crypted_message_value = $message->getValue();
                $decrypted_message_value = $this->cryptMessage->decryptMessage($crypted_message_value);

                //récupère le pseudo du créateur du message
                $message_user_id = $message->getUserId();
                $user = $userRepository->find($message_user_id);
                $message_user_username = $user->getUsername();

                //crée l'objet de réponse
                $isImage = $message->isIsImage();
                if ($isImage) {
                    $decrypted_message_value = $_ENV['PATH_API'] . $crypted_message_value;
                }


                $message_object = [
                    "username" => $message_user_username,
                    "user_id" => $message_user_id,
                    "value" => $decrypted_message_value,
                    "createdAt" => $message->getCreatedAt(),
                    "is_image" => $isImage
                ];

                array_push($message_response, $message_object);
            }

        }
        if(empty($message_response)){
            return [
                "code" => 400,
                "message" => "error"
            ];
        }

        $reverseArray = array_reverse($message_response);

        return [
            "code" => 200,
            "data" => $reverseArray
        ];
    }
}