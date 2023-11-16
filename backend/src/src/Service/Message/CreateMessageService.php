<?php 

namespace App\Service\Message;

use Doctrine\ORM\EntityManagerInterface;
use App\Service\VerifyUserService;
use PhpParser\Node\Expr\Empty_;

class CreateMessageService{

    private $entityManager;
    private $verifyUserService;

    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService){
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
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
    }
}