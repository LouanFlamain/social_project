<?php

namespace App\Service\Message;

use App\Entity\Message;
use App\Service\User\VerifyUserService;
use Doctrine\ORM\EntityManagerInterface;

class DeleteMessageService{

    private $entityManager;
    private $verifyUserService;
    
    public function __construct(EntityManagerInterface $entityManager, VerifyUserService $verifyUserService){
        $this->entityManager = $entityManager;
        $this->verifyUserService = $verifyUserService;
    }
    public function deleteMessage($data, $jwt){
        $messageId = $data['message_id'];
        if(empty($messageId)){
            return[
                "code" => 400,
                "champs manquant"
            ];
        }
        //récupère l'id du créateur du message
        $messageRepository = $this->entityManager->getRepository(Message::class);
        $message = $messageRepository->find($messageId);
        $userId = $message->getUserId();

        //vérifie si l'email du user est égal à celui du jwt

        $userVerification = $this->verifyUserService->verifyUser($userId, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "la personne connecté et l'expediteur du message ne sont pas les mêmes"
            ];
        }

        $message->setIsDelete(true);

        try{
            $this->entityManager->persist($message);
            $this->entityManager->flush();
            return [
                "code" => 200,
                "message" => "message supprimé"
            ];
        }catch(\Exception $e){
            return[
                "code" => 400,
                "message" => "La suppression du message a échoué",
                "error" => $e->getMessage()
            ];
        }
        
    }
}