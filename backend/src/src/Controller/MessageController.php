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
use Symfony\Component\HttpFoundation\File\UploadedFile;

class MessageController extends AbstractController
{
    #[Route('/api/message/create', name: "message.create", methods: "post")]
    public function createMessage(Request $request, CreateMessageService $messageService) : JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->createMessage($data, $jwt);
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
    #[Route('/api/image/create/{id}', name: "image.create", methods: "post")]
    public function createImage(Request $request, CreateImageService $imageService, $id) : JsonResponse
    {
        $file = $request->files->get('image');
        $jwt = $request->headers->get('Authorization');
        $result = $imageService->createImage($file, $jwt, $id);
        return new JsonResponse($result, $result['code']);

        //MARCHE PAAAAAS !
    }
    #[Route('/api/image/get', name: "image.get", methods: "get")]
    public function getImage()
    {
        $path = './message_image/test.jpeg'; // Chemin de votre image
        $content = file_get_contents($path);
    
        // Créer une réponse avec le contenu de l'image
        $response = new Response($content);
    
        // Définir le Content-Type en tant qu'image/jpeg
        $response->headers->set('Content-Type', 'image/jpeg');
    
        return $response;
    }
}
