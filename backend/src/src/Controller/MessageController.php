<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Message\CreateMessageService;
use App\Service\Message\DeleteMessageService;

class MessageController extends AbstractController
{
    #[Route('/api/message/create', name: "message.create", methods: "post")]
    public function createMessage(Request $request, CreateMessageService $messageService) : JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->createMessage($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/message/delete', name: "message.delete", methods: "patch")]
    public function deleteMessage(Request $request, DeleteMessageService $messageService): JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->deleteMessage($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
}
