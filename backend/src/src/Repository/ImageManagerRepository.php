<?php

namespace App\Repository;

use App\Entity\ImageManager;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ImageManager>
 *
 * @method ImageManager|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImageManager|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImageManager[]    findAll()
 * @method ImageManager[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageManagerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImageManager::class);
    }

    public function findOneByName($value): ?ImageManager
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.name = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

//    /**
//     * @return ImageManager[] Returns an array of ImageManager objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ImageManager
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
