import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Seguimiento de Inversiones</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Dólares</h2>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/wallet" className="text-blue-500 hover:underline">
              Ver inversiones en dólares
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Acciones</h2>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/argy" className="text-blue-500 hover:underline">
              Ver inversiones en acciones
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Criptomonedas</h2>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/crypto" className="text-blue-500 hover:underline">
              Ver inversiones en criptomonedas
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}