<?php

namespace App\Service\Message;

use App\Service\CryptMediaService;
use App\Service\User\VerifyUserService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Liip\ImagineBundle\Imagine\Data\DataManager;
use Liip\ImagineBundle\Imagine\Filter\FilterManager;
use App\Service\Message\CreateMessageService;


class CreateImageService{

    private $cryptMedia;
    private $params;
    private $verifyUserService;
    private $dataManager;
    private $filterManager;
    private $createMessage;

    public function __construct(CryptMediaService $cryptMedia, ParameterBagInterface $params, VerifyUserService $verifyUserService, DataManager $dataManager, FilterManager $filterManager, CreateMessageService $createMessage)
    {
        $this->cryptMedia = $cryptMedia;
        $this->params = $params;
        $this->verifyUserService = $verifyUserService;
        $this->dataManager = $dataManager;
        $this->filterManager = $filterManager;
        $this->createMessage = $createMessage;
    }
    public function createImage($file, $jwt, $id, $room){
        $userVerification = $this->verifyUserService->verifyUser($id, $jwt);
        if(!$userVerification){
            return[
                "code" => 404,
                "message" => "La personne connectée et le créateur de la room ne sont pas les mêmes"
            ];
        }
    
        if($file){
            // Afficher le chemin du fichier pour le vérifier
            $filePath = $file->getPathname();
            $fileExtension = $file->getClientOriginalExtension();
            // Vérifier si le fichier existe et est lisible
            if(file_exists($filePath) && is_readable($filePath)){
                /*$destination = $this->params->get('kernel.project_dir') . '/public/uploads';
                $newFilename = uniqid().'.'.$file->guessExtension();
                $file->move($destination, $newFilename);
        
                $filePath = $destination.'/'.$newFilename;*/
                try {
                    $content = file_get_contents($filePath);
                    //compress l'image
                    /*$image = $this->dataManager->find('chat_image', $filePath);
                    $response = $this->filterManager->applyFilter($image, 'chat_image');
                    $compressedImage = $response->getContent();*/
                    //crypt l'image
                    $encryptedContent = $this->cryptMedia->encryptFile($content);
                    //génère un id unique
                    $randomPrefix = strval(random_int(1,100));
                    $generatedId = uniqid($randomPrefix, true);

                    $targetPath = $this->params->get('kernel.project_dir') . '/public/message_image/'.$generatedId.'.'.$fileExtension;
                    file_put_contents($targetPath, $encryptedContent);

                    //mettre en base de donnée en utilisant create message pour y enregister le path et mettre le isImage sur true

                    $data = array(
                        "user_id" => $id,
                        "room_id" => $room,
                        "message_value" => $generatedId,
                        "file_extension" => $fileExtension
                    );

                    try{
                        $result = $this->createMessage->createMessage($data, $jwt, true);
                        return $result;
                    }catch(\Exception $e){
                        return[
                            "code" => 400,
                            "message" => "error : ".$e->getMessage()
                        ];
                    }
    
                } catch (\Exception $e) {
                    // Gérer l'exception
                    return[
                        "code" => 500,
                        "message" => "Erreur de lecture du fichier: " . $e->getMessage()
                    ];
                }
            } else {
                return[
                    "code" => 400,
                    "message" => "Fichier introuvable ou illisible"
                ];
            }
        }
    
        return[
            "code" => 400,
            "message" => "Fichier introuvable ou illisible"
        ];
    }
    
}