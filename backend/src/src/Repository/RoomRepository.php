<?php

namespace App\Repository;

use App\Entity\Room;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Room>
 *
 * @method Room|null find($id, $lockMode = null, $lockVersion = null)
 * @method Room|null findOneBy(array $criteria, array $orderBy = null)
 * @method Room[]    findAll()
 * @method Room[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RoomRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Room::class);
    }

    public function findUsersArrayByUserId($value1, $value2){
        $requests = $this->createQueryBuilder('r')
        ->select('r.users')
        ->where('JSON_CONTAINS(r.users, :value1) = 1')
        ->andWhere('JSON_CONTAINS(r.users, :value2) = 1')
        ->setParameter('value1', json_encode($value1))
        ->setParameter('value2', json_encode($value2))
        ->getQuery()
        ->getResult();
        $return_bool = false;
        foreach($requests as $request){
            $result = json_decode($request['users']);
            if(count($result) === 2){
                $return_bool = true;
            }
        }
        return $return_bool;
    }

    public function findRoomsByUserId($value){
        $request = $this->createQueryBuilder('r')
        ->where('JSON_CONTAINS(r.users, :value) = 1')
        ->setParameter('value', $value)
        ->getQuery()
        ->getResult();
        return $request;
    }
    public function verifyUserInRoomByUserId($userId, $roomId){
        $request = $this->createQueryBuilder('r')
        ->where('JSON_CONTAINS(r.users, :value) = 1')
        ->andWhere('r.id = :id')
        ->setParameter('value', $userId)
        ->setParameter('id', $roomId)
        ->getQuery()
        ->getResult();
        return $request;
    }

//    /**
//     * @return Room[] Returns an array of Room objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Room
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
