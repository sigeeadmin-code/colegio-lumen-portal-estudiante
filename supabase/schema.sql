-- SIGEE / Colegio Lumen — schema base para Supabase
-- Ejecutar en SQL Editor del proyecto Supabase

-- Perfiles (extiende auth.users)
create table if not exists public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol text not null check (rol in (
    'estudiante','tutor','inspector','dece','secretaria','vicerrector','rector','admin'
  )),
  nombres text,
  apellidos text,
  cedula text,
  created_at timestamptz default now()
);

alter table public.perfiles enable row level security;

-- Estudiantes
create table if not exists public.estudiantes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  nombres text not null,
  apellidos text not null,
  cedula text unique,
  curso text,
  paralelo text,
  periodo text default '2026-2027',
  created_at timestamptz default now()
);

alter table public.estudiantes enable row level security;

-- Representantes / emergencia
create table if not exists public.representantes (
  id uuid primary key default gen_random_uuid(),
  estudiante_id uuid references public.estudiantes(id) on delete cascade,
  tipo text check (tipo in ('padre','madre','representante','emergencia')),
  nombres text,
  telefono text,
  email text,
  parentesco text
);

alter table public.representantes enable row level security;

-- Asistencia diaria
create table if not exists public.asistencia_diaria (
  id uuid primary key default gen_random_uuid(),
  estudiante_id uuid references public.estudiantes(id) on delete cascade,
  fecha date not null,
  estado text check (estado in ('presente','justificada','injustificada','atraso')),
  materia text,
  registrado_por uuid references auth.users(id),
  unique (estudiante_id, fecha, materia)
);

alter table public.asistencia_diaria enable row level security;

-- Oficios
create table if not exists public.oficios (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  tipo text not null,
  asunto text,
  estado text not null default 'borrador',
  estudiante_id uuid references public.estudiantes(id),
  emisor_id uuid references auth.users(id),
  origen text check (origen in ('calificaciones','asistencia','manual','otro')),
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.oficios enable row level security;

-- Historial inmutable del oficio
create table if not exists public.oficio_historial (
  id uuid primary key default gen_random_uuid(),
  oficio_id uuid references public.oficios(id) on delete cascade,
  paso text,
  cargo text,
  accion text,
  usuario_id uuid references auth.users(id),
  observacion text,
  created_at timestamptz default now()
);

alter table public.oficio_historial enable row level security;

-- Justificaciones
create table if not exists public.justificaciones (
  id uuid primary key default gen_random_uuid(),
  estudiante_id uuid references public.estudiantes(id),
  fecha_falta date,
  motivo text,
  estado text default 'pendiente',
  adjunto_url text,
  created_at timestamptz default now()
);

alter table public.justificaciones enable row level security;

-- Nota: políticas RLS detalladas las debe completar Claude según rol
-- (estudiante solo ve lo suyo; tutor sus cursos; inspector/secretaria/dece/rector según cargo)
