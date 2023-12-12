<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Message\CreateMessageService;
use App\Service\Message\DeleteMessageService;
use App\Service\Message\CreateImageService;
use App\Service\Message\GetMessageService;
use Symfony\Component\HttpFoundation\Response;
use App\Service\Message\GetImageService;
use Symfony\Component\DependencyInjection\Attribute\Target;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MessageController extends AbstractController
{
    #[Route('/api/message/create', name: "message.create", methods: "post")]
    public function createMessage(Request $request, CreateMessageService $messageService) : JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->createMessage($data, $jwt, false);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/message/delete', name: "message.delete", methods: "delete")]
    public function deleteMessage(Request $request, DeleteMessageService $messageService): JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->deleteMessage($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/message/get', name: "message.get", methods: "post")]
    public function getMessage(Request $request, GetMessageService $messageService): JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->getMessage($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }

    //image part
    #[Route('/api/image/create/user/{id}/room/{room}', name: "image.create", methods: "post")]
    public function createImage(Request $request, CreateImageService $imageService, $id, $room) : JsonResponse
    {
        $file = $request->files->get('image');
        $jwt = $request->headers->get('Authorization');
        $result = $imageService->createImage($file, $jwt, $id, $room);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/image/get/{name}', name: "image.get", methods: "get")]
    public function getImage(Request $request, GetImageService $imageService, $name, ParameterBagInterface $params)
    {

        /*$path = './uploads/test.jpg'; // Chemin de votre image
        $content = file_get_contents($path);
    
        // Créer une réponse avec le contenu de l'image
        $response = new BinaryFileResponse($path);
    
        // Définir le Content-Type en tant qu'image/jpeg
        $response->headers->set('Content-Type', 'image/jpeg');
    
        return $response;*/
        $jwt = $request->headers->get('Authorization');
        $result = $imageService->getImage($jwt, $name);
    
        if ($result['code'] === 200) {
            $content = $result['content'];
            $response = new BinaryFileResponse($content);
            $response->headers->set('Content-Type', "image/".$result['type']);
            return $response;
            /*$randomPrefix = strval(random_int(1,100));
            $generatedId = uniqid($randomPrefix, true);
            $targetPath = $params->get('kernel.project_dir') . '/public/uploads/'. $generatedId .'.'. $result['type'];
            file_put_contents($targetPath, $content);

            if (!file_exists($targetPath)) {
                throw new \Exception("Le fichier n'existe pas.");
            }
    
                // Lire le contenu de l'image
            $imageContent = file_get_contents($targetPath);


            // Déterminer le type MIME de l'image (ajustez selon votre cas)
            $mimeType = 'image/'. $result['type']; // Par exemple pour un fichier PNG

            // Créer la réponse
            $response = new BinaryFileResponse("./uploads/".$generatedId.".".$result['type']);
            $response->headers->set('Content-Type', $mimeType);

            // Supprimer le fichier image
            //unlink($targetPath);

            // Renvoyer la réponse
            return $response;*/
        } else {
            return new JsonResponse($result, $result['code']);
        }
    }
    
    

    
}
