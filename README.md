# 💪 CommitFit

Byron Tran and Logan Moreno  
Professor Kai Li  
CS596 - Cryptography and Blockchain Fundamentals  
May 11, 2025  

## 📦 Architecture

CommitFit is a modern decentralized application (dApp) built to foster accountability and competitiveness in fitness routines using **blockchain-backed smart contracts**. It’s a full-stack application with the following architecture:

### Frontend (Client)
- Built with **Vite + React + TypeScript**
- Uses **Mantine UI** for modern, accessible UI components
- Integrates **Google Maps Places Autocomplete API** to register gym locations
- Communicates with backend via RESTful API routes prefixed with `/api`

### Backend (Server)
- **Node.js + Express**
- REST API with routes for users, pacts, gyms, check-ins, and smart contract actions
- **Neon Serverless PostgreSQL database** for storing data
- Uses **node-cron** to run scheduled tasks such as auto-finalizing expired pacts

### Smart Contracts
- Written in **Solidity**
- Local development on **Hardhat** Ethereum node
- Deployments triggered during pact creation via `ethers.js`
- Each pact has its own dedicated smart contract, with the contract address stored in the DB

### Deployment
- Not yet deployed for production
- **Docker** contained **Hardhat** node for development
- Client and server to eventually be containerized with **Docker Compose** for production
- Environment variables stored in a local `.env` (not yet using `.env.production`)

---

## 🔧 Functionality

CommitFit offers a robust set of features to support pact-based fitness accountability.

### Core Features
1. **User Authentication**
   - Wallet-based identity using **MetaMask** browser extension
   - New users are created automatically on login
   - Unique dashboards for each user

2. **Create Pact**
   - User selects a partner and defines:
     - Date range
     - Stake amount
     - Currency (ETH, Gwei, etc.)
   - A smart contract is deployed and the contract address is stored in the DB

3. **Gym Registration**
   - The user is only able to check in to gyms that are registers
   - Users add gyms via Google Maps API (Autocomplete and Maps)
   - Each gym includes `place_id`, `lng`, `lat`, and `address`
   - Stored in the `gyms` and `user_gyms` tables

4. **Daily Check-ins**
   - Device location is checked in relation to the user’s registered gyms (must be within 100m)
   - The range verification is determined by the Haversine formula
   - User can only check in once per day, per pact
   - Validated check-ins are recorded in the `checkins` table

5. **Pact Conclusion**
   - Every pact has a fixed end date
   - A cron job runs at midnight every day to check for expired pacts
   - Completed pacts are marked `completed` in DB
   - Earnings calculated based on proportion of days checked in

6. **Payout + Claim**
   - Users can claim their earnings after a pact concludes
   - A notification is sent when pacts can be claimed
   - Smart contract calls `withdraw()` to transfer funds
   - Users can view completed pacts in `/history`

---

## 📊 Business Logic

### Earning Calculation
- A user’s earnings are proportional to their **valid check-ins**
- Formula (currently done off-chain and on-chain):

```
totalPot = stakeAmount * 2;
const total = yourCheckins + partnerCheckins;
const base = total || 1;

const showEqual = yourCheckins === 0 && partnerCheckins === 0;

const yourPercent = showEqual ? 50 : (yourCheckins / base) * 100;
const partnerPercent = 100 - yourPercent;

const yourAmount = (totalPot * yourPercent) / 100;
const partnerAmount = totalPot - yourAmount;
```

### Edge Cases
- **Missed Check-ins**: Missed days are penalized and cannot be made up
- **No Check-ins**: If neither participant checks in, the app owners get the proportion of the pot based on days missed
- **No registered gyms**: Users can’t check in unless at least one gym is linked
- **Multiple Check-ins**: Only one per day, per pact is allowed

---

## 👥 User Roles + Flows

### Primary User Flow
1. Wallet login
2. Register gym
3. Create pact
4. Check in daily
5. Pact ends
6. Claim winnings

### Future Plans
- **Partner Invitations (Accept/Decline Pacts)**
- **Confirmation Screen Before SC Creation**
- **Notifications + Text/Email Reminders**
- **Group Pacts**
- **Analytics and Stats Page**
- **Mobile-friendly UI**
- **`PactFactory.sol` Integration**

---

## 📈 Vision + Impact

CommitFit provides real accountability. It gamifies discipline, not just workouts.

### Why CommitFit Matters
- Turns fitness goals into **financially-backed commitments**
- Encourages consistency over perfection
- Removes trust issues (smart contracts ensure fairness)
- Useful for:
  - Motivated gym goers
  - Keeping friends located anywhere in the world accountable
  - Online fitness challenges

### Competitive Edge
- Unlike a group chat or fitness app, CommitFit uses **real financial stakes**
- Users can’t “ghost” or “cheat” — earnings are on the blockchain
- Transparent pot distribution, proven check-in logic, and no central authority holding funds

---

## ✅ Conclusion

CommitFit is a privacy-preserving, blockchain-powered accountability tool that:
- Empowers users to take their goals seriously
- Eliminates trust issues between friends
- Uses real money and smart contracts to enforce fitness discipline
