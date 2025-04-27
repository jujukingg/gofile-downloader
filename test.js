const { listFiles, getDownloadLink, getWt, createGuestAccount, getToken, getContent } = require('./index');
const chalk = require('chalk');

const contentId = process.argv[2] || 'UPqu9l';

(async () => {
    try {
        console.log(chalk.blue('===================================='));
        console.log(chalk.green('       Démarrage des tests          '));
        console.log(chalk.blue('===================================='));
        
        console.log(chalk.yellow('\n--- Test 1: Récupérer le token invité ---'));
        const token = await getToken();
        console.log(chalk.green(`Token invité récupéré : ${token}`));

        console.log(chalk.yellow('\n--- Test 2: Récupérer la valeur wt ---'));
        const wt = await getWt();
        console.log(chalk.green(`Valeur wt récupérée : ${wt}`));

        console.log(chalk.yellow('\n--- Test 3: Récupérer le lien de téléchargement d\'un fichier ---'));
        const downloadLink = await getDownloadLink(contentId);
        console.log(chalk.green(`Lien de téléchargement récupéré : ${downloadLink}`));

        console.log(chalk.yellow('\n--- Test 4: Lister les fichiers et leurs tailles ---'));
        const files = await listFiles(contentId);
        files.forEach(file => {
            console.log(chalk.cyan(`Nom : ${file.name}`));
            console.log(chalk.magenta(`Taille : ${file.size} octets`));
            console.log(chalk.blue(`Lien : ${file.link}`));
            console.log(chalk.gray('----------------------------'));
        });

        console.log(chalk.yellow('\n--- Test 5: Récupérer le contenu d\'un fichier spécifique ---'));
        const content = await getContent(contentId, token, wt);
        console.log(chalk.green(`Contenu récupéré : ${content}`));

        console.log(chalk.blue('\n===================================='));
        console.log(chalk.green('       Fin des tests               '));
        console.log(chalk.blue('===================================='));

    } catch (err) {
        console.error(chalk.red('\n===================================='));
        console.error(chalk.red('       Erreur pendant les tests    '));
        console.error(chalk.red('===================================='));
        console.error(chalk.red('Erreur :'), err.message);
    }
})();
