<?php

namespace App\Service\Message;

use App\Service\JwtExtractEmail;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\ImageManager;
use App\Entity\Room;
use App\Service\CryptMessageService;
use App\Service\CryptMediaService;

class GetImageService{
    private $entityManager;
    private $jwtExtractEmail;
    private $cryptPath;
    private $cryptMedia;

    public function __construct(EntityManagerInterface $entityManager, JwtExtractEmail $jwtExtractEmail, CryptMessageService $cryptPath, CryptMediaService $cryptMedia)
    {
        $this->entityManager = $entityManager;
        $this->jwtExtractEmail = $jwtExtractEmail;
        $this->cryptPath = $cryptPath;
        $this->cryptMedia = $cryptMedia;
    }
    public function getImage($jwt, $name){
        //vérifie si le user du $jwt fait partie de la room où a été envoyé l'image
        $email_extract = $this->jwtExtractEmail->extractInformations($jwt);
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneByEmail($email_extract);
        if(!$user){
            return[
                "code" => 400,
                "message" => "error user"
            ];
        }
        $user_id = $user->getId();
        //récupère la room où le message a été envoyé
        $imageManagerRepository = $this->entityManager->getRepository(ImageManager::class);
        $imageManager = $imageManagerRepository->findOneByName($name);
        if(!$imageManager){
            return[
                "code" => 400,
                "message" => "error imageManager"
            ];
        }
        $imageRoom = $imageManager->getRoom();
        $imageExtension = $imageManager->getType();
        
        //vérifie si le user fait bien partie de la room

        $roomRepository = $this->entityManager->getRepository(Room::class);
        $room = $roomRepository->verifyUserInRoomByUserId($user_id, $imageRoom);
        if(count($room) === 0){
            return[
                "code" => 400,
                "message" => "accès refusé"
            ];
        }
        //decrypt le message
        $decrypted_name = $this->cryptPath->decryptMessage($name);
        $path = './message_image/'.$decrypted_name.'.'.$imageExtension;
        $content = file_get_contents($path);

        if(!$content){
            //traiter l'erreur
        }
        $decrypted_content = $this->cryptMedia->decryptMedia($content);
        return [
            'code' => 200,
            "content" => $decrypted_content,
            "type" => $imageExtension
        ];
    }
}