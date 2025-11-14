#!/bin/bash
# Скрипт миграции базы данных для продакшена
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -d $DB_NAME -f migrations/init_schema.sql
