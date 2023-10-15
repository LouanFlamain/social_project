<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckUserValidController extends AbstractController
{
    #[Route('/check/user/valid', name: 'app_check_user_valid')]
    public function index(): Response
    {
        return $this->render('check_user_valid/index.html.twig', [
            'controller_name' => 'CheckUserValidController',
        ]);
    }
    #[Route('/api/check_valid', 'user.check_valid', methods: "GET")]
    public function checkValid(): JsonResponse{
        return new JsonResponse(array(
            'code' => 200,
            'message' => 'utilisateur valide'
        ), Response::HTTP_OK);
    }
}
