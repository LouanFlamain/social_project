<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231019201244 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F72F5A1AA');
        $this->addSql('CREATE TABLE group_chat (id INT AUTO_INCREMENT NOT NULL, last_update DATE NOT NULL COMMENT \'(DC2Type:date_immutable)\', intervenant VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE channel_user DROP FOREIGN KEY FK_11C77537A76ED395');
        $this->addSql('ALTER TABLE channel_user DROP FOREIGN KEY FK_11C7753772F5A1AA');
        $this->addSql('DROP TABLE channel_user');
        $this->addSql('DROP TABLE channel');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F9D86650F');
        $this->addSql('DROP INDEX IDX_B6BD307F9D86650F ON message');
        $this->addSql('DROP INDEX IDX_B6BD307F72F5A1AA ON message');
        $this->addSql('ALTER TABLE message ADD user_id INT NOT NULL, ADD chat_id INT NOT NULL, ADD message LONGTEXT NOT NULL, DROP user_id_id, DROP channel_id, DROP text');
        $this->addSql('ALTER TABLE user ADD image VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE channel_user (channel_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_11C7753772F5A1AA (channel_id), INDEX IDX_11C77537A76ED395 (user_id), PRIMARY KEY(channel_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE channel (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE channel_user ADD CONSTRAINT FK_11C77537A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE channel_user ADD CONSTRAINT FK_11C7753772F5A1AA FOREIGN KEY (channel_id) REFERENCES channel (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE group_chat');
        $this->addSql('ALTER TABLE message ADD user_id_id INT NOT NULL, ADD channel_id INT NOT NULL, ADD text VARCHAR(255) NOT NULL, DROP user_id, DROP chat_id, DROP message');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F72F5A1AA FOREIGN KEY (channel_id) REFERENCES channel (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F9D86650F ON message (user_id_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F72F5A1AA ON message (channel_id)');
        $this->addSql('ALTER TABLE user DROP image');
    }
}
