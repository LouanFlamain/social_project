<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::STRING)]
    private ?string $users = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $lastMessageValue = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $lastMessageDate = null;

    #[ORM\Column]
    private ?bool $groups = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsers(): string
    {
        return $this->users;
    }

    public function setUsers(string $users): static
    {
        $this->users = $users;

        return $this;
    }

    public function getLastMessageValue(): ?string
    {
        return $this->lastMessageValue;
    }

    public function setLastMessageValue(string $lastMessageValue): static
    {
        $this->lastMessageValue = $lastMessageValue;

        return $this;
    }

    public function getLastMessageDate(): ?\DateTimeInterface
    {
        return $this->lastMessageDate;
    }

    public function setLastMessageDate(\DateTimeInterface $lastMessageDate): static
    {
        $this->lastMessageDate = $lastMessageDate;

        return $this;
    }

    public function getGroups(): ?bool
    {
        return $this->groups;
    }

    public function setGroups(bool $groups): static
    {
        $this->groups = $groups;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
