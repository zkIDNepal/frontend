# zkIDNepal: Zero-Knowledge KYC Verification System

A privacy-preserving digital identity verification system built on Solana blockchain that allows citizens to verify their identity without revealing personal information.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom UI components
- **Component Library**: Custom components based on shadcn/ui principles
- **State Management**: React Context API
- **Routing**: React Router v6

### Backend & Database
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for document uploads)
- **API**: Supabase REST API
- **Real-time**: Supabase Realtime subscriptions

### Blockchain Integration
- **Network**: Solana (Devnet)
- **SDK**: @solana/web3.js, @project-serum/anchor
- **Wallet Integration**: @solana/wallet-adapter-react
- **Smart Contract**: Anchor Program (Rust)

### Identity Verification
- **OCR Processing**: Custom OCR service for document data extraction
- **Zero-Knowledge Proofs**: SHA-256 hashing for proof generation
- **Verification Method**: QR code-based verification
- **Data Security**: Hashed proof data, no raw personal data stored

## Key Features

- **Document Verification**: Upload and OCR processing of Nepali citizenship documents
- **Zero-Knowledge Proof Generation**: Create verifiable credentials without exposing personal data
- **QR Code Verification**: Generate and share QR codes for identity verification
- **Decentralized Identity**: Store verification proofs on Solana blockchain
- **Privacy-Preserving**: Only verified status is shared, not the underlying data
- **Web3 Wallet Integration**: Connect with Solana wallets (Phantom, Solflare, etc.)

## Project Structure

```
zkkyc/fe/frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── idl/            # Solana program interface definitions
│   ├── lib/            # Utility functions and services
│   │   ├── auth-context.tsx      # Authentication context
│   │   ├── ocr-service.ts        # OCR document processing
│   │   ├── polls-service.ts      # Voting polls functionality
│   │   ├── supabase.ts           # Supabase client setup
│   │   └── supabase-types.ts     # TypeScript types for DB
│   ├── pages/          # Application pages
│   │   ├── Dashboard.tsx          # User dashboard with QR code
│   │   ├── KYCVerification.tsx    # KYC verification flow
│   │   ├── VerifyProof.tsx        # Proof verification page
│   │   └── VerificationResult.tsx # Verification results page
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Database Schema

### Tables
- `users`: User accounts and authentication
- `verification_details`: KYC verification information 
- `verification_proofs`: Zero-knowledge proof records
- `polls`: Voting polls that require verification
- `poll_options`: Options for each poll
- `votes`: User votes on polls

## Setup and Installation

### Prerequisites
- Node.js v18+ and npm/yarn
- Supabase account
- Solana development environment

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/zkkyc.git
cd zkkyc/fe/frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SOLANA_NETWORK=devnet
VITE_PROGRAM_ID=your_solana_program_id
```

4. Start the development server
```bash
npm run dev
```

## Verification Flow

1. **User Authentication**: User signs in via Supabase Auth
2. **Document Upload**: Citizenship document is uploaded
3. **OCR Processing**: Document is processed to extract identity information
4. **Wallet Connection**: User connects their Solana wallet
5. **Proof Generation**: Zero-knowledge proof is generated from extracted data
6. **Blockchain Storage**: Proof hash is stored on Solana (optional)
7. **Database Storage**: Proof details are stored in Supabase
8. **QR Code Generation**: Verification QR code is generated for the user
9. **Verification**: Third parties can verify identity by scanning QR code

## API Endpoints

The application primarily uses Supabase's auto-generated REST API for database operations:

- `verification_proofs`: Store and retrieve zero-knowledge proofs
- `verification_details`: Store verified identity information
- `users`: Manage user accounts and KYC status

## Deployment

The application is designed to be deployed on any standard web hosting platform:

1. Build the application
```bash
npm run build
```

2. Deploy the `dist` directory to your hosting service

## Future Enhancements

- Integrate with zkSNARK/zkSTARK for more robust zero-knowledge proofs
- Add support for additional identity documents
- Implement decentralized storage via IPFS
- Expand verifiable credentials for different use cases

## License

[MIT License](LICENSE)

## Contributors

- Yugant Ghimire
- Rudransh Singh Tomar
