#!/usr/bin/env ts-node
/**
 * Create a new Stellar wallet (keypair).
 * Usage:
 *   pnpm stellar:create-wallet           # generate keypair only
 *   pnpm stellar:create-wallet --fund    # generate and fund on testnet (Friendbot)
 */

import { Keypair } from 'stellar-sdk';

const FRIENDBOT_URL = 'https://friendbot.stellar.org';

async function fundTestnetAccount(publicKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${FRIENDBOT_URL}/?addr=${encodeURIComponent(publicKey)}`);
    if (!res.ok) {
      console.error('Friendbot request failed:', res.status, await res.text());
      return false;
    }
    const data = (await res.json()) as { transaction_hash?: string };
    console.log('Funded on testnet. Transaction:', data.transaction_hash ?? 'see response');
    return true;
  } catch (e) {
    console.error('Friendbot error:', e);
    return false;
  }
}

function main(): void {
  const fund = process.argv.includes('--fund');

  const keypair = Keypair.random();
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  console.log('\n--- Stellar wallet created ---\n');
  console.log('Public key (Stellar address):', publicKey);
  console.log('Secret key:                  ', secretKey);
  console.log('\n⚠️  Keep the secret key private. Never commit it or share it.\n');

  if (fund) {
    console.log('Funding account on testnet via Friendbot...');
    fundTestnetAccount(publicKey).then((ok) => {
      if (ok) console.log('Done. Account is active on testnet.');
      process.exit(ok ? 0 : 1);
    });
  }
}

main();
