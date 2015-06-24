#!/bin/bash
#******************************************************************#
#   mesmo não tendo o arquivo: .htaccess acrescente:			   #
# --exclude-.htaccess para que no destino ele não seja excluido    #
#******************************************************************#
rsync --chown=emtudo:emtudo -Pravuzpth --exclude=.htaccess --delete-after \
	--exclude=/storage/ \
	--exclude=.env \
	--exclude=.htaccess \
	/var/www/emtudo/sistema/new/ \
	root@216.59.16.37:/home/emtudo/sistema/new/
