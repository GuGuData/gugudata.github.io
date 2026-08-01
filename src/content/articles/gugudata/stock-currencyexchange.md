---
title: "国际货币汇率 API 接口"
description: "接口详情官网地址: https://www.gugudata.com/api/details/currencyexchange"
section: "gugudata"
slug: "stock-currencyexchange"
lang: "en"
status: "published"
tags: ["API","GuGuData"]
publishedAt: "2025-07-13T13:40:31.000Z"
updatedAt: "2026-04-24T22:34:50.000Z"
canonicalUrl: "https://www.gugudata.com/api/details/currencyexchange"
cover: "https://static.gugudata.com/api_cover_stock_currencyexchange.png"
author: "GuGuData"
---
**接口详情官网地址:** [https://www.gugudata.com/api/details/currencyexchange](https://www.gugudata.com/api/details/currencyexchange)

国际货币汇率 API 支持多种货币对，基础数据、货币等关键词场景常会用到，适合用于证券行情与财报数据查询、投研分析与策略开发与监控告警与交易前筛选等业务场景，方便开发者直接在应用、脚本或数据流程中接入。

![gugudata_api_cover](https://static.gugudata.com/api_cover_stock_currencyexchange.png)

## 1. 产品功能

- 支持多种货币汇率查询；
- 支持部分加密货币汇率查询；
- 数据为每日更新汇率数据；
- 可一次查询源货币代码对应所有目标货币汇率；
- 秒级查询性能，支持高并发；
- 围绕“国际货币汇率”提供标准化能力，便于快速接入现有业务；
- 适合将“国际货币汇率”结果接入业务系统、后台工具和自动化流程；
- 适合行情看板、投研系统和自动化数据任务接入；

## 2. API 文档

**接口地址:** https://api.gugudata.com/v2/finance/currency-exchange

**返回格式:** application/json; charset=utf-8

**请求方式:** GET

**请求协议:** HTTPS

**请求示例:** https://api.gugudata.com/v2/finance/currency-exchange?appkey=REDACTED&source=YOUR_VALUE&target=YOUR_VALUE&date=YOUR_VALUE

**数据预览:** [https://www.gugudata.com/preview/currencyexchange](https://www.gugudata.com/preview/currencyexchange)

**接口测试:** [https://api.gugudata.com/v2/finance/currency-exchange/demo](https://api.gugudata.com/v2/finance/currency-exchange/demo)

## 3. 请求参数

| 参数名 | 参数类型 | 是否必须 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| appkey | string | 是 | YOUR_APPKEY | 付费后获取的 APPKEY |
| source | string | 是 | YOUR_VALUE | 源货币代码，例如：USD，支持的货币：$MYRO(myro) \| $WEN(wen) \| 00(00 token) \| 1000SATS(1000sats) \| 1INCH(1inch) \| AAVE(aave) \| ABT(arcblock) \| ACH(alchemy pay) \| ACS(acryptos) \| ADA(cardano) \| AED(emirati dirham) \| AERGO(aergo) \| AERO(aero coin) \| AFN(afghan afghani) \| AGIX(singularitynet) \| AGLD(adventure gold) \| AI(flourishing ai) \| AIOZ(aioz network) \| AKT(akash network) \| ALCX(alchemix) \| ALEPH(aleph.im) \| ALEX(alexandrite) \| ALGO(algorand) \| ALICE(my neighbor alice) \| ALL(albanian lek) \| ALPH(alephium) \| ALT(altcoin) \| ALUSD(alchemix usd) \| AMD(armenian dram) \| AMP(amp) \| ANG(dutch guilder) \| ANKR(ankr network) \| ANT(aragon) \| AOA(angolan kwanza) \| APE(apecoin) \| APEX(apexcoin) \| API3(api3) \| APT(aptos) \| AR(arweave) \| ARB(arbitrum) \| ARK(ark) \| ARKM(arkm) \| ARPA(arpa chain) \| ARS(argentine peso) \| ASM(assemble protocol) \| AST(airswap) \| ASTR(astar) \| ATA(automata network) \| ATOM(cosmos) \| ATS(austrian schilling) \| AUCTION(bounce token auction) \| AUD(australian dollar) \| AUDIO(audius) \| AURORA(aurora) \| AVAX(avalanche) \| AVT(aventus) \| AWG(aruban or dutch guilder) \| AXL(axelar) \| AXS(axie infinity) \| AZERO(aleph zero) \| AZM(azerbaijani manat) \| AZN(azerbaijan manat) \| BABYDOGE(babydoge eth) \| BADGER(badger dao) \| BAKE(bakerytoken) \| BAL(balancer) \| BAM(bosnian convertible mark) \| BAND(band protocol) \| BAT(basic attention token) \| BBD(barbadian or bajan dollar) \| BCH(bitcoin cash) \| BDT(bangladeshi taka) \| BDX(beldex) \| BEAM(beam) \| BEF(belgian franc) \| BGB(bitget token) \| BGN(bulgarian lev) \| BHD(bahraini dinar) \| BICO(biconomy) \| BIF(burundian franc) \| BIGTIME(bigtime) \| BIT(bitdao) \| BLD(bld) \| BLUR(blur) \| BLZ(bluzelle) \| BMD(bermudian dollar) \| BNB(binance coin) \| BND(bruneian dollar) \| BNT(bancor network) \| BOB(bolivian bolíviano) \| BOBA(boba network) \| BOND(barnbridge) \| BONK(bonk) \| BORA(bora) \| BORG(borg) \| BRL(brazilian real) \| BSD(bahamian dollar) \| BSV(bitcoin sv) \| BSW(biswap) \| BTC(bitcoin) \| BTC.B(btc.b) \| BTCB(bitcoin bep2) \| BTG(bitcoin gold) \| BTN(bhutanese ngultrum) \| BTRST(braintrust) \| BTT(bittorrent) \| BUSD(binance usd) \| BWP(botswana pula) \| BYN(belarusian ruble) \| BYR(belarusian ruble) \| BZD(belizean dollar) \| C98(coin98) \| CAD(canadian dollar) \| CAKE(pancakeswap) \| CANTO(canto) \| CBETH(coinbase wrapped staked eth) \| CDAI(compound dai) \| CDF(congolese franc) \| CDT(blox) \| CELO(celo) \| CELR(celer network) \| CETH(ceth) \| CFG(centrifuge) \| CFX(conflux) \| CGLD(celo gold) \| CHEEL(cheel) \| CHF(swiss franc) \| CHR(chromia) \| CHZ(chiliz) \| CKB(nervos network) \| CLP(chilean peso) \| CLV(clover finance) \| CNH(chinese yuan renminbi offshore) \| CNY(chinese yuan renminbi) \| COMAI(comai) \| COMP(compound) \| COP(colombian peso) \| CORE(core group asset) \| CORGIAI(corgiai) \| COTI(coti) \| COVAL(coval) \| CQT(covalent) \| CRC(costa rican colon) \| CRO(crypto.com chain) \| CRPT(crypterium) \| CRV(curve dao token) \| CSPR(casper) \| CTC(cartercoin) \| CTSI(cartesi) \| CTX(cryptex finance) \| CUC(cuban convertible peso) \| CUP(cuban peso) \| CVC(civic) \| CVE(cape verdean escudo) \| CVX(convex finance) \| CWBTC(cwbtc) \| CYP(cypriot pound) \| CZK(czech koruna) \| DAG(constellation) \| DAI(dai) \| DAO(dao maker) \| DAR(mines of dalarnia) \| DASH(digital cash) \| DCR(decred) \| DDX(derivaDAO) \| DEM(german deutsche mark) \| DESO(decentralized social) \| DEXE(dexe) \| DEXT(dextools) \| DFI(dfistarter) \| DIA(dia) \| DIMO(dimo) \| DJF(djiboutian franc) \| DKK(danish krone) \| DNT(district0x) \| DOGE(dogecoin) \| DOP(dominican peso) \| DORA(dora factory) \| DOT(polkadot) \| DREP(drep [new]) \| DYDX(dydx) \| DYM(dym) \| DYP(defi yield protocol) \| DZD(algerian dinar) \| EDU(educoin) \| EDUM(edum) \| EEK(estonian kroon) \| EGLD(elrond) \| EGP(egyptian pound) \| ELA(elastos) \| ELF(aelf) \| ELG(escoinToken) \| ENJ(enjin coin) \| ENS(ethereum name service) \| EOS(eos) \| ERN(eritrean nakfa) \| ESP(spanish peseta) \| ETB(ethiopian birr) \| ETC(ethereum classic) \| ETH(ethereum) \| ETH2(ethereum 2.0) \| ETHDYDX(ethdydx) \| ETHW(ethw) \| ETHX(ethx) \| EUR(euro) \| EUROC(euro coin) \| EVER(everLife.AI) \| FDUSD(fdusd) \| FEI(fei usd) \| FET(fetch.ai) \| FIDA(bonfida) \| FIL(filecoin) \| FIM(finnish markka) \| FIS(stafi) \| FJD(fijian dollar) \| FKP(falkland island pound) \| FLOKI(baby moon floki) \| FLOW(flow) \| FLR(flare) \| FLUX(datamine flux) \| FNSA(fnsa) \| FORT(forta) \| FORTH(ampleforth governance token) \| FOX(shapeshift fox token) \| FRAX(frax) \| FRF(french franc) \| FRXETH(frxeth) \| FTM(fantom) \| FTN(ftn) \| FTT(farmatrust) \| FX(function x) \| FXS(frax share) \| GAJ(gaj finance) \| GAL(project galaxy) \| GALA(gala) \| GAS(gas) \| GBP(british pound) \| GEL(georgian lari) \| GFI(goldfinch) \| GGP(guernsey pound) \| GHC(ghanaian cedi) \| GHS(ghanaian cedi) \| GHST(aavegotchi) \| GIP(gibraltar pound) \| GLM(golem) \| GLMR(moonbeam) \| GMD(gambian dalasi) \| GMT(stepn) \| GMX(goldmaxcoin) \| GNF(guinean franc) \| GNO(gnosis) \| GNS(gains network) \| GNT(greentrust) \| GODS(gods unchained) \| GRD(greek drachma) \| GRT(the graph) \| GST(green satoshi token) \| GT(gatetoken) \| GTC(gitcoin) \| GTQ(guatemalan quetzal) \| GUSD(gemini us dollar) \| GXC(gx coin) \| GYD(guyanese dollar) \| GYEN(gyen) \| HBAR(hedera) \| HBTC(huobi btc) \| HFT(hashflow) \| HIGH(highstreet) \| HKD(hong kong dollar) \| HNL(honduran lempira) \| HNT(helium) \| HONEY(honey) \| HOPR(hopr) \| HOT(hydro protocol) \| HRK(croatian kuna) \| HT(huobi token) \| HTG(haitian gourde) \| HUF(hungarian forint) \| ICP(internet computer) \| ICX(icon project) \| ID(trigid) \| IDEX(idex) \| IDR(indonesian rupiah) \| IEP(irish pound) \| ILS(israeli shekel) \| ILV(illuvium) \| IMP(isle of man pound) \| IMX(immutable x) \| INDEX(index cooperative) \| INJ(injective) \| INR(indian rupee) \| INV(inverse finance) \| IOST(ios token) \| IOTA(iota) \| IOTX(iotex) \| IQD(iraqi dinar) \| IRR(iranian rial) \| ISK(icelandic krona) \| ITL(italian lira) \| JASMY(jasmy) \| JEP(jersey pound) \| JMD(jamaican dollar) \| JOD(jordanian dinar) \| JOE(joe) \| JPY(japanese yen) \| JST(just) \| JTO(jto) \| JUP(jupiter) \| KAS(kas) \| KAVA(kava) \| KCS(kucoin) \| KDA(kadena) \| KEEP(keep network) \| KES(kenyan shilling) \| KGS(kyrgyzstani som) \| KHR(cambodian riel) \| KLAY(klaytn) \| KMF(comorian franc) \| KNC(kyber network crystals) \| KPW(north korean won) \| KRL(kryll) \| KRW(south korean won) \| KSM(kusama) \| KUB(bitkub coin) \| KUJI(kujira) \| KWD(kuwaiti dinar) \| KYD(caymanian dollar) \| KZT(kazakhstani tenge) \| LAK(lao kip) \| LBP(lebanese pound) \| LCX(lcx) \| LDO(lido dao token) \| LEO(leocoin) \| LINK(chainlink) \| LIT(litentry) \| LKR(sri lankan rupee) \| LOKA(league of kingdoms arena) \| LOOM(loom network) \| LPT(livepeer (lpt)) \| LQTY(liquity) \| LRC(loopring) \| LRD(liberian dollar) \| LSETH(liquid staked ethereum) \| LSK(lisk) \| LSL(basotho loti) \| LTC(litecoin) \| LTL(lithuanian litas) \| LUF(luxembourg franc) \| LUNA(terra) \| LUNC(lunc) \| LUSD(limited usd) \| LVL(latvian lat) \| LYD(libyan dinar) \| LYX(lyx) \| LYXE(lukso) \| MAD(moroccan dirham) \| MAGIC(magic) \| MANA(mana coin decentraland) \| MANTA(manta) \| MASK(mask network) \| MATH(math) \| MATIC(polygon) \| MAV(mav) \| MAVIA(mavia) \| MBX(mobiecoin) \| MCO2(moss carbon credit) \| MDL(moldovan leu) \| MDT(measurable data token) \| MEDIA(media network) \| MEME(pepe) \| METH(mirrored ether) \| METIS(metisDAO) \| MGA(malagasy ariary) \| MGF(malagasy franc) \| MINA(mina) \| MIR(mirror protocol) \| MKD(macedonian denar) \| MKR(maker) \| MKUSD(mkusd) \| MLN(enzyme) \| MMK(burmese kyat) \| MNDE(marinade) \| MNT(mongolian tughrik) \| MOBILE(mobile) \| MOG(mog) \| MONA(monavale) \| MOP(macau pataca) \| MOVR(moonriver) \| MPL(maple) \| MRO(mauritanian ouguiya) \| MRU(mauritanian ouguiya) \| MSOL(marinade staked sol) \| MTL(maltese lira) \| MUBI(mubi) \| MULTI(multichain) \| MUR(mauritian rupee) \| MUSE(muse) \| MVR(maldivian rufiyaa) \| MWK(malawian kwacha) \| MX(marsx) \| MXC(mxc) \| MXN(mexican peso) \| MXV(mxv) \| MYR(malaysian ringgit) \| MZM(mozambican metical) \| MZN(mozambican metical) \| NAD(namibian dollar) \| NCT(polyswarm) \| NEAR(near protocol) \| NEO(neo) \| NEON(neon) \| NEST(nest protocol) \| NEXO(nexo) \| NFT(nft) \| NGN(nigerian naira) \| NIO(nicaraguan cordoba) \| NKN(nkn) \| NLG(dutch guilder) \| NMR(numeraire network) \| NOK(norwegian krone) \| NOS(nos) \| NPR(nepalese rupee) \| NTRN(neutron) \| NU(nucypher) \| NXM(nxm) \| NZD(new zealand dollar) \| OAS(oas) \| OCEAN(ocean protocol) \| OGN(origin token) \| OHM(olympus v1) \| OKB(okex) \| OKT(oec token) \| OLAS(olas) \| OM(mantra dao) \| OMG(omisego) \| OMI(ecomi) \| OMR(omani rial) \| ONDO(ondo) \| ONE(menlo one) \| ONT(ontology) \| OOKI(ooki protocol) \| OP(optimism) \| ORCA(orca) \| ORDI(ordi) \| ORN(orion protocol) \| OSMO(osmosis) \| OX(betbox) \| OXT(orchid network) \| PAAL(paal) \| PAB(panamanian balboa) \| PANDORA(pandora) \| PAX(paxos standard token) \| PAXG(pax gold) \| PEN(peruvian sol) \| PENDLE(pendle) \| PEOPLE(constitutionDAO) \| PEPE(pepe) \| PERP(perpetual protocol) \| PGK(papua new guinean kina) \| PHP(philippine peso) \| PIXEL(pixelverse) \| PKR(pakistani rupee) \| PLA(playdapp) \| PLN(polish zloty) \| PLU(pluton) \| PNG(pangolin) \| POKT(pocket network) \| POLS(polkastarter) \| POLY(polymath) \| POLYX(polyx) \| POND(marlin) \| PORK(pork) \| PORTAL(portal) \| POWR(powerledger) \| PRIME(echelon prime) \| PRO(propy) \| PROM(prometeus) \| PRQ(parsiq) \| PTE(portuguese escudo) \| PUNDIX(pundi x (new)) \| PYG(paraguayan guarani) \| PYR(vulcan forged pyr) \| PYTH(pyth) \| PYUSD(pyusd) \| QAR(qatari riyal) \| QI(benqi) \| QNT(quant) \| QSP(quantstamp) \| QTUM(qtum) \| QUICK(quickswap) \| RAD(radicle) \| RAI(rai reflex index) \| RARE(superRare) \| RARI(rarible) \| RAY(raydium) \| RBN(ribbon finance) \| REN(renbtc) \| RENDER(render) \| REP(augur) \| REPV2(repv2) \| REQ(request) \| RETH(rocket pool eth) \| RGT(rari governance token) \| RIF(rif token) \| RLB(rlb) \| RLC(iexec rlc) \| RLY(rally) \| RNDR(render token) \| ROL(romanian leu) \| RON(romanian leu) \| ROSE(oasis network) \| RPL(rocket pool) \| RSD(serbian dinar) \| RUB(russian ruble) \| RUNE(thorchain (erc20)) \| RVN(ravencoin) \| RWF(rwandan franc) \| SAND(the sandbox) \| SAR(saudi arabian riyal) \| SATS(satoshi) \| SAVAX(savax) \| SBD(solomon islander dollar) \| SC(siacoin) \| SCR(seychellois rupee) \| SDD(sudanese dinar) \| SDG(sudanese pound) \| SEAM(seam) \| SEI(sei) \| SEK(swedish krona) \| SFP(safepal) \| SFRXETH(sfrxeth) \| SFUND(seedify.fund) \| SGB(subgame) \| SGD(singapore dollar) \| SHDW(genesysgo shadow) \| SHIB(shiba inu) \| SHP(saint helenian pound) \| SHPING(shping coin) \| SIT(slovenian tolar) \| SKK(slovak koruna) \| SKL(skale network) \| SLE(sierra leonean leone) \| SLL(sierra leonean leone) \| SLP(smooth love potion) \| SNT(status network) \| SNX(synthetix network) \| SOL(solana) \| SOS(somali shilling) \| SPA(sperax) \| SPELL(spell token) \| SPL(seborgan luigino) \| SRD(surinamese dollar) \| SRG(surinamese guilder) \| SSP(south sudanese pound) \| SSV(ssvcoin) \| STD(sao tomean dobra) \| STETH(lido steth) \| STG(stargate finance) \| STN(sao tomean dobra) \| STORJ(storj) \| STRAX(stratis) \| STRD(strd) \| STRK(strike) \| STSOL(lido for solana) \| STX(stacks) \| SUI(sui) \| SUKU(suku) \| SUPER(superfarm) \| SUSHI(sushiswap) \| SVC(salvadoran colon) \| SWETH(sweth) \| SWFTC(swftcoin) \| SXP(swipe) \| SYLO(sylo) \| SYN(synapse) \| SYP(syrian pound) \| SZL(swazi lilangeni) \| T(threshold) \| TAO(tao) \| TET(tet) \| TFUEL(theta fuel) \| THB(thai baht) \| THETA(theta) \| TIA(tianhe) \| TIME(chrono.tech) \| TJS(tajikistani somoni) \| TKX(token x) \| TMM(turkmenistani manat) \| TMT(turkmenistani manat) \| TND(tunisian dinar) \| TON(tokamak network) \| TONE(te-food) \| TOP(tongan pa'anga) \| TOPIA(topia) \| TOR(torcoin) \| TRAC(origintrail) \| TRB(tellor) \| TRIBE(tribe) \| TRL(turkish lira) \| TRU(truefi) \| TRUMP(trumpcoin) \| TRX(tron) \| TRY(turkish lira) \| TTD(trinidadian dollar) \| TTT(tap project) \| TUSD(true usd) \| TVD(tuvaluan dollar) \| TVK(terra virtua kolect) \| TWD(taiwan new dollar) \| TWT(trust wallet token) \| TZS(tanzanian shilling) \| UAH(ukrainian hryvnia) \| UGX(ugandan shilling) \| UMA(universal market access) \| UNFI(unifi protocol dao) \| UNI(uniswap) \| UOS(ultra) \| UPI(pawtocol) \| UQC(uquid coin) \| USD(us dollar) \| USDC(usdc) \| USDD(usdd) \| USDE(unitarystatus dollar) \| USDP(usdp stablecoin) \| USDT(tether) \| UST(terrausd) \| USTC(ustc) \| UYU(uruguayan peso) \| UZS(uzbekistani som) \| VAL(vatican city lira) \| VARA(vara) \| VEB(venezuelan bolívar) \| VED(ved) \| VEF(venezuelan bolívar) \| VELO(velo) \| VES(venezuelan bolívar) \| VET(vechain) \| VGX(voyager token) \| VND(vietnamese dong) \| VNST(vnst) \| VOXEL(voxies) \| VR(victoria vr) \| VTHO(vechainthor) \| VUV(ni-vanuatu vatu) \| WAMPL(wrapped ampleforth) \| WAVES(waves) \| WAXL(axelar) \| WAXP(wax) \| WBETH(wbeth) \| WBT(wbt) \| WBTC(wrapped bitcoin) \| WCFG(wrapped centrifuge) \| WEMIX(wemix) \| WRH(whrh) \| WIF(wif) \| WLD(wld) \| WLUNA(wrapped luna) \| WOO(woo network) \| WST(samoan tala) \| XAF(central african cfa franc beac) \| XAG(silver ounce) \| XAI(sapiencecoin) \| XAU(gold ounce) \| XAUT(tether gold) \| XBT(xbt) \| XCD(east caribbean dollar) \| XCH(chia) \| XCN(chain) \| XDC(xdc network) \| XDR(imf special drawing rights) \| XEC(eternal coin) \| XEM(nem) \| XLM(stellar lumen) \| XMON(xmon) \| XMR(monero) \| XOF(cfa franc) \| XPD(palladium ounce) \| XPF(cfp franc) \| XPT(platinum ounce) \| XRD(radix) \| XRP(ripple) \| XTZ(tezos) \| XVS(venus) \| XYO(xyo network) \| YER(yemeni rial) \| YFI(yearn finance) \| YFII(dfi.money) \| ZAR(south african rand) \| ZEC(zcash) \| ZEN(horizen) \| ZETA(zeta) \| ZIL(zilliqa) \| ZMK(zambian kwacha) \| ZMW(zambian kwacha) \| ZRX(zrx 0x) \| ZWD(zimbabwean dollar) \| ZWL(zimbabwean dollar) |
| target | string | 否 | YOUR_VALUE | 目标货币代码，例如：CNY，不传递则返回所有支持的货币对 |
| date | string | 否 | YOUR_VALUE | 固定某日的历史汇率，格式为 yyyy-mm-dd，如 2024-01-01，目前仅支持最近 2～3 天的历史数据，不传递则返回实时汇率。 |

## 4. 返回参数

| 参数名 | 参数类型 | 备注 |
| --- | --- | --- |
| dataStatus.statusCode | int | 接口返回状态码 |
| dataStatus.statusDescription | string | 接口返回状态说明 |
| dataStatus.responseDateTime | string | 接口数据返回时间 |
| dataStatus.dataTotalCount | int | 此条件下的总数据量，一般用于分页计算 |
| data.sourceCurrency | string | 源货币代码 |
| data.targetCurrency.sourceCurrency | string | 汇率结果：源货币代码 |
| data.targetCurrency.targetCurrency | string | 汇率结果：目标货币代码 |
| data.targetCurrency.exchangeRate | double | 汇率结果：汇率 |
| data.targetCurrency.lastUpdateTimestamp | string | 汇率结果：最后更新时间戳 |
| data.lastUpdateTimestamp | string | 最后更新时间戳 |

## 5. 错误码说明

| 状态码 | 错误说明 | 备注 |
| --- | --- | --- |
| 200 | 正常返回 | - |
| 400 | 参数错误 | - |
| 402 | APPKEY 错误 | 请检查传递的 APPKEY 是否为开发者中心获取到的值 |
| 403 | 账号欠费 | 请及时关注订单到期短信提醒 |
| 429 | 请求频率受限 | 每秒请求不能超过 100 次 |
| 500 | 接口响应错误 | - |

## 6. 适用场景

- 适合用于证券行情与财报数据查询，快速补齐产品侧需要的 国际货币汇率 数据能力。
- 适合用于投研分析与策略开发，减少手工整理、清洗与重复开发成本。
- 适合用于监控告警与交易前筛选，将接口结果直接接入后台系统、数据任务或内容处理流程。

## 7. 相关接口

- 可搭配使用：[A 股历年三大财务报表](https://www.gugudata.com/api/details/cnannualreport)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股历年财务指标](https://www.gugudata.com/api/details/financialindicator)，适合补充同类场景的接口能力。
- 可搭配使用：[A 股个股信息查询](https://www.gugudata.com/api/details/fundamentalinfo)，适合补充同类场景的接口能力。
