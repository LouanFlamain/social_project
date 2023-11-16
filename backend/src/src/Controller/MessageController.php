<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Message\CreateMessageService;

class MessageController extends AbstractController
{
    #[Route('/api/message/create', name: "message.create", methods: "post")]
    public function createMessage(Request $request, CreateMessageService $messageService) : JsonResponse{
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $messageService->createMessage($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
}
