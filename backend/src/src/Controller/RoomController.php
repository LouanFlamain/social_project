<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Room\CreateRoomSingleService;
use App\Service\Room\CreateRoomMultiService;
use App\Service\Room\AddUserToRoom;
use App\Service\Room\GetRoomService;
use App\Service\Room\UpdateRoomNameService;
use Symfony\Component\HttpFoundation\Request;

class RoomController extends AbstractController
{
    #[Route('/api/create_room', name: "room.create", methods: "post")]
    public function createRoom(CreateRoomSingleService $roomServiceSingle, CreateRoomMultiService $roomServiceMulti, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        if (count($data['users']) > 2) {
            $result = $roomServiceMulti->createRoom($data, $jwt);
        } else {
            $result = $roomServiceSingle->createRoom($data, $jwt);
        }
        return new JsonResponse($result, $result['code']);
    }

    #[Route('/api/get_rooms', name: "room.get", methods: "post")]
    public function getRoom(GetRoomService $roomService, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $roomService->getRooms($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }

    #[Route('/api/room/add_user', name: "room.add", methods: "post")]
    public function addToRoom(AddUserToRoom $addService, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $addService->addUser($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
    #[Route('/api/room/name_update', name: "room.name.update", methods: "patch")]
    public function updateRoomName(Request $request, UpdateRoomNameService $updateRoomNameService)
    {
        $data = json_decode($request->getContent(), true);
        $jwt = $request->headers->get('Authorization');
        $result = $updateRoomNameService->updateRoomName($data, $jwt);
        return new JsonResponse($result, $result['code']);
    }
}