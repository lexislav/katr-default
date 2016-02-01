Instrukce pro instalaci Craft CMS pro aplikaci KATR - Katalog technických řešení KOMA


Postup
———

1) vytvořit databázi

Databáze:
db:     komakatalogcz
user:   komakatalogcz
pass:   8fc2a328


2) nastavit MAMP do složky /public

např.:
<VirtualHost *:80>
    DocumentRoot "/Users/Lexislav/Sites/koma-katalog.cz/public/"
    ServerName koma-katalog.dev
    ServerAlias www.koma-katalog.dev
    ErrorLog "logs/komakatalog-dev-error_log"
</VirtualHost>

3) nastavení oprávnění

craft/app/
craft/config/
craft/storage/

774


4) spustit instalátor 
http://your.domain/admin

