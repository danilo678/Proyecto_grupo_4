#!/bin/bash

set -e

export PGPASSWORD=123qwe

# Crear DB si no existe
psql -h localhost -U postgres -tc "SELECT 1 FROM pg_database WHERE datname='sgedb'" | grep -q 1 \
  || psql -h localhost -U postgres -c "CREATE DATABASE sgebd;"

echo "Base de datos lista"

# 🔥 BORRAR TODO el esquema público (más seguro)
psql -h localhost -U postgres -d sgebd -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Crear tablas
psql -h localhost -U postgres -d sgebd -f tablas.sql

# Insertar datos
psql -h localhost -U postgres -d sgebd -f datos.sql

echo "Base de datos inicializada correctamente"