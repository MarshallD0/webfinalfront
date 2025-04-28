import { NextResponse } from 'next/server';

// Datos de usuarios (simulando una base de datos)
const members = [
    { username: "sandra.g", password: "latte123", fullName: "Sandra García", membershipNumber: 5001 },
    { username: "roberto.m", password: "capuccino456", fullName: "Roberto Martínez", membershipNumber: 5002 },
    { username: "esteban.l", password: "espresso789", fullName: "Esteban López", membershipNumber: 5003 }
];

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Validar que se enviaron ambos campos
        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: "Usuario y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Buscar el usuario
        const member = members.find(m => 
            m.username === username && m.password === password
        );

        if (member) {
            return NextResponse.json({
                success: true,
                fullName: member.fullName,
                membershipNumber: member.membershipNumber
            });
        } else {
            return NextResponse.json(
                { success: false, error: "Credenciales inválidas" },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Error en el servidor" },
            { status: 500 }
        );
    }
}