Pour démarrer l'API et le serveur, exécutez la commande suivante :

docker-compose up --build

Pour se connecter à l'API via un appareil distant (sur le même réseau Wi-Fi), récupérez l'adresse IP utilisée par WSL via le terminal Windows.
Exemple :
    Ethernet adapter vEthernet (WSL (Hyper-V firewall)):

        Connection-specific DNS Suffix  . :
        Link-local IPv6 Address . . . . . : fe80::87f3:ce35:4a8a:8c3c%23
        IPv4 Address. . . . . . . . . . . : 172.17.48.1
        Subnet Mask . . . . . . . . . . . : 255.255.240.0
        Default Gateway . . . . . . . . . :

L'adresse à utiliser sera : 172.17.48.1:3001

(Il se peut que vous deviez ouvrir le port 3001 sur votre machine)