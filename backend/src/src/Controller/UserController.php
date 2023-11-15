<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Request;

class UserController extends AbstractController
{
    #[Route('/api/register', name: "user.register", methods: "POST")]
    public function register(UserService $userService, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $result = $userService->createUser($data);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/login', name: "api_login", methods:"POST")]
    public function login(){}
}
