<?php

namespace App\Service\Message;

use App\Service\CryptMediaService;
use App\Service\User\VerifyUserService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class CreateImageService{

    private $cryptMedia;
    private $params;
    private $verifyUserService;

    public function __construct(CryptMediaService $cryptMedia, ParameterBagInterface $params, VerifyUserService $verifyUserService)
    {
        $this->cryptMedia = $cryptMedia;
        $this->params = $params;
        $this->verifyUserService = $verifyUserService;
    }
    public function createImage($file, $jwt, $id){
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
            // Vérifier si le fichier existe et est lisible
            if(file_exists($filePath) && is_readable($filePath)){
                try {
                    $content = file_get_contents($filePath);
                    $encryptedContent = $this->cryptMedia->encryptFile($content);
                    //génère un id unique
                    $randomPrefix = strval(random_int(1,100));
                    $generatedId = uniqid($randomPrefix, true);

                    $targetPath = $this->params->get('kernel.project_dir') . '/public/message_image/'.$generatedId.'.dat';
                    file_put_contents($targetPath, $encryptedContent);
    
                    return[
                        "code" => 200,
                        "success" => true
                    ];
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