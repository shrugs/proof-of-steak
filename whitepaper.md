% Proof of Steak & The Steak Network
% Matt Condon
% October 15, 2017

# Abstract

We present Proof of Steak, an algorithm capable of securing a blockchain where block proofs cannot be computed cryptographically. Proof of Steak is inspired by and modeled after the TrueBit Protocol[^1] and Verification Game[^2], and uses Proof of Stake[^3] to validate proofs in the event of a challenge.

Further, we present the Steak Network, an implementation of Proof of Steak. In the Steak Network, the proofs are pictures of steak (a confusingly named "Proof of Steak"). The Steak Network uses Proof of Steak to verify that every proof in the set of finalized proofs (the “Steakchain”) is a picture of a steak (and not, for example, a picture of something that is not steak).

[^1]: https://truebit.io/
[^2]: https://people.cs.uchicago.edu/~teutsch/papers/truebit.pdf
[^3]: https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51

# Use Cases

Proof of Steak can be used to secure a blockchain in any situation where the proofs are a function of opinion and not mathematics, effectively creating a curated registry. In the Steak Network, for example, the proofs are pictures of steaks; whether or not a picture is of a steak is not (yet) machine-verifiable and is a function of crowd-opinion.

Additional use cases include

- creating a set of verifiably rare memes,
- decentrally curating a dataset for machine learning or AI training,
- decentralized MTurk[^4], or
- building a database of every rock on earth.[^5]

[^4]: Mechanical Turk, https://www.mturk.com/mturk/welcome
[^5]: How Many Rocks Are There, And Where Are They? http://www.howmany.rocks/

# Proof of Steak and The TrueBit Protocol

Proof of Steak differs slightly from the TrueBit protocol: firstly, we rename all of the actors in the system for comedic effect. Network participants and Verifiers are Steak Holders, Task Givers are Butchers, and Solvers are Cooks. Challengers (Verifiers that challenge the validity of a solution) are Grill Masters.

Additionally, the TrueBit Verification Game doesn't apply to Proof of Steak; there is no way to computationally and objectively verify that a submitted Proof is valid. Therefore, in lieu of the Verification Game, we propose that Challenges are resolved using a Proof of Stake protocol (“Grilling the Cook”). All network participants ("Steak Holders") can become a potential Proof of Stake Witness (“Backseat Griller”) by joining the Witness Pool (“Backseat Griller Crowd”). They then have a chance to become a Backseat Griller, weighted by staked amount, in the event of a challenge. These Backseat Grillers then follow the Proof of Stake protocol for voting on the validity of a challenged Proof. This voting is a simple weighted majority/minority voting scheme.

Proof of Steak also:

- limits the number of Challengers ("Grill Masters") to one,
- includes, but slightly alters the mechanics of jackpots and taxes,
- implements forced errors to incentivise Verifiers, and
- alters the economic interactions to account for new actors and protocol implementation.

# Proof of Steak and IPFS

The Steak Network Proofs must be made widely available for all network participants. Therefore, they will be stored using the InterPlanetary File System (IPFS), a high-throughput, content-addressed distributed block storage model. There are low security concerns as no sensitive data are stored and widespread dissemination of network Proofs is encouraged. IPFS has been made production-ready through notable projects such as FileCoin.

Also we get to namedrop IPFS in the whitepaper for extra credibility.

# Proof of Steak Protocol Overview

Any network participant (“Steak Holder”) may submit a task ("become Butcher") requesting a valid Proof be submitted to the network for some reward.

Steak Holders can submit a Proof to the network ("become Cook") to fulfill a Butcher's request and stake tokens on its validity. This Proof is considered valid until challenged. If not challenged within the challenge timeout period, it is finalized, the staked tokens are released, and the Cook is rewarded. If a proof is challenged, the Grilling of the Cook begins, which elects Backseat Grillers to validate or invalidate the Proof. The Cook’s stake is burned if the Grilling determines that they have submitted an invalid Proof.

To incentivise Verifiers, the network also introduces forced errors, which invert the game theory and slightly alter the economic incentives. After a Cook commits the Proofs, they know whether a forced error is in effect or not. In the case of a forced error, the Cook reveals an intentionally incorrect Proof. Then, upon a successful challenge and Grilling, Grill Masters are awarded a jackpot payout.

If a Cook, Grill Master, or Backseat Griller is determined to have acted maliciously, their stake is forfeited to the jackpot at tax rate T and otherwise burned (“burned to the Jackpot”).

# Proof of Steak Protocol Detail
The following section provides a detailed look into the operation of Proof of Steak.

1. A Steak Holder becomes Butcher by requesting a Proof be submitted to the network and providing a reward _Reward_ for its fulfillment.
2. A Steak Holder becomes Cook by submitting a Proof to the network to fulfill a Butcher's request. This involves:
    - Generating a random secret number _r_, the hash of which (_Hr_) is published to the blockchain,
    - Preparing one valid _Proof A_,
    - Preparing one invalid _Proof B_, and
    - Staking token amount _S_ on their rational behavior.
3. The next block is mined.
    - The hash of the block header is determined.
    - The Cook knows both the secret number _r_ and the block header hash and can determine whether or not a forced error is in effect by hashing the two inputs and determining if the sum is less than the forced error rate _Fr_.
        + If a forced error is NOT in effect, commit the salted hash of valid _Proof A_
        + If a forced error IS in effect, commit the salted hash of invalid _Proof B_
4. Between this point and timeout, any Steak Holder may become Grill Master and Challenge the committed Proof.
    - If no Steak Holders become Grill Master:
        + The Proof is considered valid and finalized.
        + Cook’s stake is partially released and partially taxed at rate _Tc_ to fund the Jackpot.
        + Cook is rewarded with _Reward_ from Butcher.
        + The Butcher's request is fulfilled.
    - If a Steak Holder becomes Grill Master, the Grilling of the Cook begins.

### The Grilling of the Cook

1. Grill Master stakes token amount Sm on the invalidity of the committed _Proof_.
2. Cook reveals secret number _r_, allowing the other actors to determine if a forced error is in effect.
3. If a forced error is NOT in effect:
    1. Elect Backseat Grillers from the Backseat Griller Crowd, weighted by staked token amount.
    2. Backseat Grillers vouch for the validity or invalidity of the revealed _Proof_ by _witnessTimeout_.
        - If the Proof is determined to be valid:
            + Cook’s stake is released,
            + Cook is rewarded with _Reward_ from Butcher.
            + Grill Master’s stake is burned to the Jackpot,
            + Minority-voting Backseat Grillers’ stake is partially burned to the Jackpot,
            + The _Proof_ is finalized.
            + The Butcher's Request is fulfilled.
        - If the Proof is determined to be invalid:
            + Cook’s stake is burned to the Jackpot at tax rate _T_ and otherwise awarded to the Grill Master,
            + Grill Master’s stake is released,
            + Minority-voting Backseat Grillers’ stake is partially burned,
            + The _Proof_ is discarded.
            + The Butcher's request is non fulfilled and is still valid.
4. If a forced error IS in effect:
    1. Cook reveals valid _Proof A_, discarding invalid _Proof B_
    2. Between now and _2 * timeout_, Cooks can become Second Grill Master and Challenge the validity of _Proof A_
        - If no Cooks become Second Grill Master:
            + The Cook’s stake is released.
            + Cook is rewarded with _Reward_ from Butcher.
            + The Grill Master’s stake is released.
            + The Grill Master is awarded Jackpot _J_.
            + The _Proof A_ is considered valid and finalized.
            + The Butcher's Request is fulfilled.
        - If a Cook becomes Second Grill Master, the Grilling of the Cook begins.
            1. Second Grill Master stakes token amount _Sm_ on the invalidity of _Proof A_.
            2. Elect Backseat Grillers from the Backseat Griller Crowd, weighted by staked token amount.
            3. Backseat Grillers vouch for the validity or invalidity of the _Proof A_ by )_witnessTimeout_.
                - If the _Proof A_ is determined to be valid:
                    + The Cook’s stake is released.
                    + Cook is rewarded with _Reward_ from Butcher,
                    + The Cook is rewarded with Jackpot _J_,
                    + Grill Master’s stake is released,
                    + Majority-voting Backseat Grillers are awarded with fractional Jackpot _Jf_, and
                    + The _Proof A_ is finalized.
                - If the _Proof A_ is determined to be invalid:
                    + Cook’s stake is burned to the Jackpot,
                    + Grill Master is awarded fractional Jackpot _Jf_,
                    + Minority-voting Backseat Griller’ stake is partially burned to the Jackpot, and
                    + The _Proof A_ is discarded.
                    + Butcher's request is discarded but may be resubmitted. _Reward_ is returned to the Butcher.

# Actors and Incentives
What follows is a summary of the actors in the network, their definitions, and their incentives for participating in the network.

#### Steak Holders (Network Participants & Verifiers)
Steak Holders are holders of the network token. They have the ability to become Butcher and request a valid Proof be submitted to the network, the ability to become Cook by submitting Proofs to the network, and the ability to become Grill Master and challenge another Cook's Proof.

#### Butcher (Task Giver)
Any network participant may become Butcher and request a Proof to be submitted to the network and provide a reward for doing so.

#### Cook (Solver)
Any Steak Holder may become Cook by submitting a Proof to fulfill a Butcher's task and staking tokens on its validity. If a Cook behaves correctly, their Proof is finalized and included in the set of valid proofs. If a Cook's Proof is challenged and the Cook is the loser of the Verification Game, their stake is burned to the jackpot.

#### Grill Master (Challenger)
Any Steak Holder may become Grill Master by challenging a Cook's Proof of Steak and staking on its invalidity. If the Grill Master is the winner of the Verification Game under normal conditions, they receive a small payout, deducted from the Cook's stake. If the Grill Master is the winner of the Verification Game under forced-error conditions, they receive a jackpot payout, deducted from the shared jackpot pool. If the Grill Master loses the Grilling of the Cook, their stake is burned.

#### Backseat Griller (Proof of Stake Witness)
By staking large amounts of the network token, Steak Holders can join the Backseat Griller Crowd (Witness Pool). When a Proof of Steak is challenged and the Grilling of the Cook begins, Backseat Grillers are randomly selected by the network via the Proof of Stake protocol. Backseat Grillers have the ability to vouch for the validity or invalidity of a Proof of Steak. Backseat Grillers that side with the minority have their stake burned. Under forced-error conditions, Backseat Grillers that side with the majority receive a share of the jackpot payout.

---

# Steak Network
The Steak Network is a decentralized social network of Steak enthusiasts that enables decentralized sharing of pictures of steak ("Proofs of Steak").

## The $TEAK Token

#### Usage

The \$TEAK token fulfills a few purposes[^6]:

1. It makes the "\$TEAK Holder", "\$TEAK Stake", and "burning \$TEAK" jokes possible,
2. It aligns the financial incentives of network participants by providing:
    - negative incentive for malicious activity, and
    - postitive incentive for altruistic and rational activity, and
3. It is necessary for the operation of Proof of Stake[^7] as the medium being staked.

[^6]: (besides being justification to run an ICO)
[^7]: An argument could be made for simply using Ether as the medium being staked, but then we wouldn't be able to satisfy _point 1_.

#### Total Supply

To arrive at the total supply of \$TEAK tokens, we follow the following formula[^8]:

$$ G(\varrho) = \text{literally just googling the phrase } \varrho $$
$$ \zeta = G(\text{"how many cows are in the world"}) \approx 1,500,000,000 \text{cows} $$
$$ \varsigma = G(\text{"how many steaks does a cow make"}) \approx 430 \text{lbs} \approx 195044 \text{grams} $$
$$ \omega = \text{average steak size} = G(\text{"ikinari steak menu"}) \implies 300 \text{grams} $$
$$ \tau = \text{total supply} = \frac{\zeta * \varsigma}{\omega} = 975,220,000,000 \text{ \$TEAK} $$

[^8]: No, the greek letters don't mean anything,
    I chose the most obscure ones I could find.
    Please be impressed at my $$ L^aTe^\chi F\theta\tau^{\alpha^{TT^{\iota\eta^{G}}}} $$

\newpage

#### Initial Cutting of Steak (ICS)

The Steak Network would benefit heavily from using the Interactive Coin Offerings[^9] protocol to conduct its ICS, but we aren't yet in a perfect utopia where the IICO protocol is implemented. Until the Interactive Coin Offering protocol is production ready, we'll have to make do with the following ICO strategy:

1. Literally just sending \$TEAK to anyone that gives us ETH, at an arbitrary valuation until it's all gone.
2. Donating 100% the proceeds to the Ethereum Foundation and second-layer infrastructure projects.
    - This follows Vitalik Buterin's pledge[^10] to donate advisor shares to charity and second-layer infrastructure.

Percent | Project or Charity           | Reason
|:------|------------------------------|---------------------------------------------------|
10%     | The Ethereum Foundation      | Securing our Steaks (and, like, Ethereum stuff)
50%     | TrueBit Establishment        | Protocol Inspiration (aka doing most of the work)
20%     | Anyone Willing To Build This | It'd be hilarious.

The ISC begins whenever we start it and will end whenever all of the \$TEAK is fully distributed, or we have reached the inevitable heat-death of the universe, whichever comes first.

[^9]: https://people.cs.uchicago.edu/~teutsch/papers/ico.pdf
[^10]: https://twitter.com/vitalikbuterin/status/911217245094686720

## Steak Network Implementation

### The Network

In the Steak Network, the Butcher (Task Giver) and Cook (Solver) are the same entity, simply referred to as "Cook"; it can be thought of as providing the Task “submit a Proof” and immediately solving it by including the Proof itself. This does not affect the protocol game theory because the reward for submitting proofs to the Steak Network is the raw, unparalleled joy of having your Proof of Steak included in the Steakchain.

Due to the increased number of expensive actions required to become a successful Cook, the Steak Network has an increased barrier of entry compared to proof submission processes in other stake-based networks. For example, in the TrueBit protocol, solvers simply run virtual machine bytecode and create Merkle proofs of intermediate and final results. In Proof of Steak, participants must locate images of particular cuts of meat on third-party services such as Google Images, Pinterest, or Real Life. They must then perform additional tasks such as Copy-And-Paste, Save-To-Folder, or Upload-To-Computer. Because Cooks must perform many difficult and taxing tasks for low compensation, the resistance of the network to attack is significantly improved and attacks become rarer.

### The dApp Client

The Steak network will be implemented as a mobile app, supporting the latest iOS and Android operating systems. It will also function as an ERC20-compatible wallet for interacting with the \$TEAK token contract.

### \$TEAK Wallet

The Steak Network App (the "App") will allow you to become a \$TEAK Holder by providing a locally generated secret key and Ethereum address to which you can send \$TEAK. Once you are a \$TEAK Holder, you can fully interact with the Steak Network.

### The Steakchain Feed

The primary screen of the app is the Steakchain feed, where \$TEAK Holders act as verifiers. It is an Instagram-style, infinitely scrolling set of Cook-submitted Proofs of Steak. You can:

1. "Heart" Proofs of Steak[^11] to save them to your personal table,
2. Rate Proofs of Steak[^12], and
3. Become Grill Master by challenging a Cook's Proof of Steak.

[^11]: This is to justify our rediculous valuation when we IPO. It will be changed to "Claps" at an arbitrary point in the future.
[^12]: Ratings range from "rare" (the best) to "well done" (the worst).

### The Proof Submission Page

\$TEAK Holders can also become Cook and submit Proofs to the network for validation. This involves committing two Proofs to the network, one valid and one invalid. In the case of the Steak Network, this means we commit one picture is *is* of a steak, and one picture of anything that is *not steak*. Let it be known that hotdogs are not steak.

### The Backseat Griller Crowd Page

\$TEAK Holders can join the Backseat Griller Crowd by staking appropriate amounts of \$TEAK.

When they have been elected as a Backseat Griller during the Grilling of the Cook, they receive a push notification, informing them of the privilege. They then have until the Backseat Griller timeout to vouch for the validity or the invalidity of the challenged Proof.

The Steak Network presents this as a Tinder-style card stack where Backseat Grillers swipe right to vouch for the validity of a Proof and swipe left to vouch for its invalidity.

~~Backseat Grillers can purchase Steak Network Gold™ to see which steaks have liked them already.~~

### Your Steak Table

The Proofs of Steak that you "heart" show up here, where you can add notes and give them nicknames for later reference.

## Strategic Partnerships

In the name of strategic ~~buzzwords~~ marketing, the Steak Network will also be integrated into Internet-of-Things Grills. Cooks with IoT Grills will have their Proofs of Steak automatically submitted to the network.

## Future Obstacles

Note that due to the Steak Network's use of Proof of Steak, forks are not only possible, but highly encouraged, because hand-crafting submissions is a messy process. The Steak Network will also implement knife-based slashing conditions for disincentivizing Proof of Stake protocol violations.

Additionally, malicious actors could conspire to repost Proofs of Steak and reap the rewards. To enable Cooks to identify duplicate Proofs of Steak, the Steak Network will operate an external **Unique Steak Oracle**. This Oracle, operating outside of the Ethereum network, will analyze all submitted Proofs of Steak using classical steak fingerprinting to detect duplicates. The oracle's findings will be used to inform, but not control, \$TEAK Holders' decisions as they browse the Steakchain Feed.

## Advisors and Investors

The Steak Network Foundation is proud to be advised by:

- Jason Teutsch and Robbie Bent, of the TrueBit Establishment
- Jackson Palmer, creator of Dogecoin

The Steak Network is supported by:

- Ryan Zurrer, Polychain Capital.

We never actually asked if we could use his name, but there it is:

- Vitalik Buterin, creator of Ethereum

---

# Conclusion

In summary, we have illustrated Proof of Steak, a protocol capable of computing non-cryptographically-modeled proofs, backed by Proof of Stake.

We further presented the Steak Network, the canonical implementation of Proof of Steak, powered by the \$TEAK token. We detailed the ICS process for ensuring optimal \$TEAK distribution, ensuring that the Steak Network is inherently secure from the start.

#### Acknowledgments

Jason Teutsch for his work on the TrueBit Protocol, as well as the Interactive Coin Offerings protocol.

Wayne Chang for valuable additions, clarifications, and "fork" jokes.

Robbie Bent, Harley Swick, Sina Habibian, and Dylan Nguyen for valuable feedback.

Dhruv Lutha for joining the Slack channel.
