import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';

// mongo pass : 2sNQqGhEip8uVV4
// mongo user : Thani
class App {
    public express = express()
    public locationList = [{'latitude': 43.6797825118023, 'longitude': -79.51486129976277}, {'latitude': 43.68453279604958, 'longitude': -79.40067085724678}, {'latitude': 43.68774835833163, 'longitude': -79.44993493021683}, {'latitude': 43.67996904382249, 'longitude': -79.32893834489394}, {'latitude': 43.68588314206284, 'longitude': -79.42345417446063}, {'latitude': 43.701057208337595, 'longitude': -79.46116153760721}, {'latitude': 43.68376789579655, 'longitude': -79.34726836489324}, {'latitude': 43.70487204543421, 'longitude': -79.35616202586627}, {'latitude': 43.6812059245892, 'longitude': -79.37645777399388}, {'latitude': 43.689345330139396, 'longitude': -79.3699588796743}, {'latitude': 43.694687866314375, 'longitude': -79.34558335782687}, {'latitude': 43.68763696859674, 'longitude': -79.4482368488694}, {'latitude': 43.69663553166043, 'longitude': -79.51825271840426}, {'latitude': 43.69697302219051, 'longitude': -79.39890337270725}, {'latitude': 43.68363842523602, 'longitude': -79.45919409282791}, {'latitude': 43.694050330494996, 'longitude': -79.3463270946758}, {'latitude': 43.68506608519163, 'longitude': -79.41334646340201}, {'latitude': 43.688958655998796, 'longitude': -79.52865613525057}, {'latitude': 43.69475645019505, 'longitude': -79.4284259768758}, {'latitude': 43.70616854998989, 'longitude': -79.43732256850552}, {'latitude': 43.68207030980302, 'longitude': -79.34054656504934}, {'latitude': 43.700531953470026, 'longitude': -79.3752003073172}, {'latitude': 43.70477632677177, 'longitude': -79.33288357330643}, {'latitude': 43.69925763000618, 'longitude': -79.3792830920064}, {'latitude': 43.69635020371327, 'longitude': -79.40463663188994}, {'latitude': 43.70489115591878, 'longitude': -79.53528957282742}, {'latitude': 43.68012581853064, 'longitude': -79.54469061362872}, {'latitude': 43.70402937820426, 'longitude': -79.44734761982899}, {'latitude': 43.69736815000835, 'longitude': -79.53008531974686}, {'latitude': 43.696453168488816, 'longitude': -79.38386054109712}, {'latitude': 43.69823891976144, 'longitude': -79.41403138293045}, {'latitude': 43.70101391847824, 'longitude': -79.28753246876163}, {'latitude': 43.68940446245247, 'longitude': -79.31897788781549}, {'latitude': 43.706265985665794, 'longitude': -79.32732497737891}, {'latitude': 43.69979222396729, 'longitude': -79.47053647368222}, {'latitude': 43.68397036357025, 'longitude': -79.37606736266744}, {'latitude': 43.686366233054706, 'longitude': -79.52412452713243}, {'latitude': 43.70281248677038, 'longitude': -79.43824597667644}, {'latitude': 43.68086698381026, 'longitude': -79.54829364730723}, {'latitude': 43.69085182806264, 'longitude': -79.44144699786786}, {'latitude': 43.70289061142172, 'longitude': -79.4625900364271}, {'latitude': 43.6973884175285, 'longitude': -79.30520072966497}, {'latitude': 43.70054855059484, 'longitude': -79.43395613573622}, {'latitude': 43.70556903686404, 'longitude': -79.55131916612967}, {'latitude': 43.679732004097296, 'longitude': -79.48918896940218}, {'latitude': 43.68549389075251, 'longitude': -79.44144368659661}, {'latitude': 43.69395007111899, 'longitude': -79.38512053812049}, {'latitude': 43.69867294417289, 'longitude': -79.5303693360461}, {'latitude': 43.70624687311837, 'longitude': -79.51092082941098}, {'latitude': 43.68095993562739, 'longitude': -79.46807343925875}, {'latitude': 43.68064107177081, 'longitude': -79.56538647934866}, {'latitude': 43.68582445510747, 'longitude': -79.28816942969083}, {'latitude': 43.70611574324401, 'longitude': -79.52528707391374}, {'latitude': 43.69429926032928, 'longitude': -79.4751227122507}, {'latitude': 43.68277861429994, 'longitude': -79.44140472219816}, {'latitude': 43.680113804583925, 'longitude': -79.43259372213795}, {'latitude': 43.69876620917226, 'longitude': -79.3139501439091}, {'latitude': 43.694320205789005, 'longitude': -79.35717040891929}, {'latitude': 43.70237725179506, 'longitude': -79.53355977321702}, {'latitude': 43.702198759088816, 'longitude': -79.56883176324176}, {'latitude': 43.69268058900136, 'longitude': -79.4495111728378}, {'latitude': 43.6875087376932, 'longitude': -79.33892450757031}, {'latitude': 43.697923092934346, 'longitude': -79.385738373692}, {'latitude': 43.697307209031194, 'longitude': -79.50505459107424}, {'latitude': 43.69220050465516, 'longitude': -79.55267929430829}, {'latitude': 43.70020673933587, 'longitude': -79.52442735154123}, {'latitude': 43.70296779720532, 'longitude': -79.41655591593381}, {'latitude': 43.687748737570395, 'longitude': -79.29875307018243}, {'latitude': 43.70568365391397, 'longitude': -79.3871323325206}, {'latitude': 43.70270756666762, 'longitude': -79.46741575483887}, {'latitude': 43.691679338043166, 'longitude': -79.4208943200032}, {'latitude': 43.69071815485013, 'longitude': -79.35623498131771}, {'latitude': 43.68719502543253, 'longitude': -79.510136100176}, {'latitude': 43.704870511977504, 'longitude': -79.34270314056062}, {'latitude': 43.70220008455943, 'longitude': -79.50579851371695}, {'latitude': 43.679947562117185, 'longitude': -79.3820239135748}, {'latitude': 43.68063424653177, 'longitude': -79.51391706624004}, {'latitude': 43.680779432401906, 'longitude': -79.5551829629921}, {'latitude': 43.69876647307186, 'longitude': -79.50855649333654}, {'latitude': 43.705310913909905, 'longitude': -79.36198772447383}, {'latitude': 43.693933443205516, 'longitude': -79.54895282681143}, {'latitude': 43.69132222783948, 'longitude': -79.42134970733156}, {'latitude': 43.698368640658146, 'longitude': -79.36396728950048}, {'latitude': 43.70427350003846, 'longitude': -79.40658020111256}, {'latitude': 43.699301590032526, 'longitude': -79.31636356106631}, {'latitude': 43.6991740235691, 'longitude': -79.4827713040102}, {'latitude': 43.68882516032412, 'longitude': -79.43817587090398}, {'latitude': 43.69305730647934, 'longitude': -79.51790186022467}, {'latitude': 43.68854763223609, 'longitude': -79.51214627856115}, {'latitude': 43.686030280071016, 'longitude': -79.55318192498264}, {'latitude': 43.70218872294764, 'longitude': -79.34417850386431}, {'latitude': 43.6936614045404, 'longitude': -79.30260207434756}, {'latitude': 43.69203502807204, 'longitude': -79.47168346341702}, {'latitude': 43.69523342750207, 'longitude': -79.47685455641658}, {'latitude': 43.689630007953895, 'longitude': -79.53344753156418}, {'latitude': 43.69743104933217, 'longitude': -79.36359018045152}, {'latitude': 43.68252653922217, 'longitude': -79.33339510137127}, {'latitude': 43.69817165978687, 'longitude': -79.44561830148776}, {'latitude': 43.685484507898074, 'longitude': -79.47030862964478}, {'latitude': 43.69883862276419, 'longitude': -79.48846843304182}, {'latitude': 43.69767245719085, 'longitude': -79.40024794990705}, {'latitude': 43.697771932766386, 'longitude': -79.38229383789856}, {'latitude': 43.697375227131936, 'longitude': -79.41829394071941}, {'latitude': 43.6811945204919, 'longitude': -79.35894746383507}, {'latitude': 43.69791546362344, 'longitude': -79.32847132111979}, {'latitude': 43.70074729296667, 'longitude': -79.3017339116076}, {'latitude': 43.68060953849175, 'longitude': -79.40841866243208}, {'latitude': 43.703624103228144, 'longitude': -79.54228065964462}, {'latitude': 43.68860893904636, 'longitude': -79.41158689756959}, {'latitude': 43.690852068713134, 'longitude': -79.50039536497184}, {'latitude': 43.69625162303514, 'longitude': -79.56870539373428}, {'latitude': 43.70018702174917, 'longitude': -79.52229252875665}, {'latitude': 43.68471287427673, 'longitude': -79.32431164786577}, {'latitude': 43.691471607264006, 'longitude': -79.34388612269709}, {'latitude': 43.68279061766405, 'longitude': -79.33136296631228}, {'latitude': 43.68667928426216, 'longitude': -79.41759415774563}, {'latitude': 43.70355875227533, 'longitude': -79.42650464953132}, {'latitude': 43.68938961629626, 'longitude': -79.29339212924488}, {'latitude': 43.69187867722562, 'longitude': -79.31898390106811}, {'latitude': 43.69629226756938, 'longitude': -79.5021786428322}, {'latitude': 43.68490741247797, 'longitude': -79.4713996748516}, {'latitude': 43.68155722972062, 'longitude': -79.39918581590898}, {'latitude': 43.6944598625156, 'longitude': -79.37983642515898}, {'latitude': 43.68701279727035, 'longitude': -79.35644994876678}, {'latitude': 43.68732576620501, 'longitude': -79.51739538468236}, {'latitude': 43.69041345250136, 'longitude': -79.30498057124699}, {'latitude': 43.68755104126424, 'longitude': -79.3215587299458}, {'latitude': 43.700928970403595, 'longitude': -79.43023255380372}, {'latitude': 43.70196350453147, 'longitude': -79.3117202325392}, {'latitude': 43.696844497451764, 'longitude': -79.54127267830562}, {'latitude': 43.692851786542946, 'longitude': -79.41306660213598}, {'latitude': 43.68819204412586, 'longitude': -79.55269060199704}, {'latitude': 43.704405650176554, 'longitude': -79.55716293400867}, {'latitude': 43.68049840213824, 'longitude': -79.44759194831704}, {'latitude': 43.67961204641287, 'longitude': -79.41925539336113}, {'latitude': 43.68510123017664, 'longitude': -79.34345555852}, {'latitude': 43.68226022742707, 'longitude': -79.44574977859209}, {'latitude': 43.70127795456197, 'longitude': -79.31677295109631}, {'latitude': 43.68499926978898, 'longitude': -79.39503638402131}, {'latitude': 43.69616853895609, 'longitude': -79.43606680554042}, {'latitude': 43.68047748492297, 'longitude': -79.4229172710652}, {'latitude': 43.70606340533928, 'longitude': -79.42432828169184}, {'latitude': 43.68276529908223, 'longitude': -79.3398906253069}, {'latitude': 43.69695056524329, 'longitude': -79.54076394377086}, {'latitude': 43.705982279542305, 'longitude': -79.42648098196148}, {'latitude': 43.68835943532821, 'longitude': -79.55526609038783}, {'latitude': 43.69491526663298, 'longitude': -79.32730606980303}, {'latitude': 43.70259875180679, 'longitude': -79.41219120182703}, {'latitude': 43.68918752419468, 'longitude': -79.33609961678886}, {'latitude': 43.702078715669515, 'longitude': -79.52667325746178}, {'latitude': 43.69180199764529, 'longitude': -79.56026587827111}, {'latitude': 43.693931196067794, 'longitude': -79.30817763162334}, {'latitude': 43.691185912240314, 'longitude': -79.35908845828351}, {'latitude': 43.70219987645524, 'longitude': -79.54077384222593}, {'latitude': 43.68581763065241, 'longitude': -79.38065753145645}, {'latitude': 43.68057947954735, 'longitude': -79.30652417024511}, {'latitude': 43.705413406640886, 'longitude': -79.5602963016456}, {'latitude': 43.69860781835556, 'longitude': -79.37726435481639}, {'latitude': 43.695724715535015, 'longitude': -79.31840621343446}, {'latitude': 43.68766261176938, 'longitude': -79.53605286233574}, {'latitude': 43.69669261212873, 'longitude': -79.48290121442497}, {'latitude': 43.70254186614717, 'longitude': -79.31243674620848}, {'latitude': 43.69364081396209, 'longitude': -79.35011884728507}, {'latitude': 43.68694251307545, 'longitude': -79.43482221307427}, {'latitude': 43.69698915073925, 'longitude': -79.48474867972479}, {'latitude': 43.68504644463851, 'longitude': -79.32079113943715}, {'latitude': 43.696204156175895, 'longitude': -79.380478012072}, {'latitude': 43.68699095681862, 'longitude': -79.37080912631323}, {'latitude': 43.688563860475156, 'longitude': -79.2991581942375}, {'latitude': 43.68258262378054, 'longitude': -79.53032609687797}, {'latitude': 43.697263982717864, 'longitude': -79.33111165586534}, {'latitude': 43.69199970853933, 'longitude': -79.53385101363821}, {'latitude': 43.68628541401738, 'longitude': -79.46887240223813}, {'latitude': 43.68145754226556, 'longitude': -79.37771934273529}, {'latitude': 43.68500974927485, 'longitude': -79.3787296145017}, {'latitude': 43.680840396810275, 'longitude': -79.32768993142432}, {'latitude': 43.69725644926527, 'longitude': -79.44662794890645}, {'latitude': 43.69903606533001, 'longitude': -79.31599861938662}, {'latitude': 43.68350560985624, 'longitude': -79.469769961305}, {'latitude': 43.689217623354374, 'longitude': -79.45076675664522}, {'latitude': 43.698361457268575, 'longitude': -79.36046694988578}, {'latitude': 43.69248366641893, 'longitude': -79.44351776746868}, {'latitude': 43.68240103195878, 'longitude': -79.38113240938586}, {'latitude': 43.68944680751645, 'longitude': -79.3828924679281}, {'latitude': 43.69262128116635, 'longitude': -79.42405290260871}, {'latitude': 43.68315127425803, 'longitude': -79.29078401462654}, {'latitude': 43.690140491893025, 'longitude': -79.42906168292969}, {'latitude': 43.69648705298629, 'longitude': -79.5020252655928}, {'latitude': 43.6825843461199, 'longitude': -79.54737767000722}, {'latitude': 43.696450767197454, 'longitude': -79.34316956421753}, {'latitude': 43.70034887545369, 'longitude': -79.33235801057316}, {'latitude': 43.68820793510634, 'longitude': -79.32502688773673}, {'latitude': 43.68426798587645, 'longitude': -79.43267033536253}, {'latitude': 43.693133878878776, 'longitude': -79.53461811888275}, {'latitude': 43.70254028188444, 'longitude': -79.39216413784688}, {'latitude': 43.68837151953515, 'longitude': -79.34979714097318}, {'latitude': 43.7022194164359, 'longitude': -79.44738596944423}, {'latitude': 43.685056003727944, 'longitude': -79.45039452252328}, {'latitude': 43.69607998704261, 'longitude': -79.46960261324041}, {'latitude': 43.68343505431891, 'longitude': -79.35860069224995}, {'latitude': 43.685156209474265, 'longitude': -79.52077607756276}, {'latitude': 43.69578948264478, 'longitude': -79.49565819623609}, {'latitude': 43.69992505792856, 'longitude': -79.50925913713286}, {'latitude': 43.70552542651754, 'longitude': -79.39098830736782}, {'latitude': 43.70583865497127, 'longitude': -79.54903258744174}, {'latitude': 43.6889921890501, 'longitude': -79.29583532012367}, {'latitude': 43.69964547757893, 'longitude': -79.38911096507421}, {'latitude': 43.7058478184405, 'longitude': -79.30471382588513}, {'latitude': 43.686754525228274, 'longitude': -79.38473820957817}, {'latitude': 43.70230543326841, 'longitude': -79.39221648043878}, {'latitude': 43.702534186736116, 'longitude': -79.48864551692961}, {'latitude': 43.69908580022842, 'longitude': -79.53171151474041}, {'latitude': 43.68214299127664, 'longitude': -79.34736231639963}, {'latitude': 43.67997985489447, 'longitude': -79.30911306834467}, {'latitude': 43.684986432968635, 'longitude': -79.46140469051413}, {'latitude': 43.68889064615436, 'longitude': -79.46744879556297}, {'latitude': 43.685244534661386, 'longitude': -79.43654097675166}, {'latitude': 43.68505001188813, 'longitude': -79.31366008092768}, {'latitude': 43.683045368264025, 'longitude': -79.3892592876553}, {'latitude': 43.696551301439904, 'longitude': -79.46004566828573}, {'latitude': 43.70584882741585, 'longitude': -79.33015454207376}, {'latitude': 43.69706919248471, 'longitude': -79.46596042909735}, {'latitude': 43.68132158649233, 'longitude': -79.54582754916252}, {'latitude': 43.68220749284415, 'longitude': -79.2926440760912}, {'latitude': 43.68561856581512, 'longitude': -79.32509746673523}, {'latitude': 43.69890023081987, 'longitude': -79.4842035169604}, {'latitude': 43.68042478207537, 'longitude': -79.48138714212962}, {'latitude': 43.705219723517494, 'longitude': -79.39985522304201}, {'latitude': 43.70176376932929, 'longitude': -79.30590119635377}, {'latitude': 43.699860569827955, 'longitude': -79.55418316563242}, {'latitude': 43.691767485616005, 'longitude': -79.43426839927662}, {'latitude': 43.683501483837404, 'longitude': -79.4162141056329}, {'latitude': 43.69021555699827, 'longitude': -79.56310916868217}, {'latitude': 43.6824361339254, 'longitude': -79.5291379334139}, {'latitude': 43.691785814711075, 'longitude': -79.35639220983636}, {'latitude': 43.70377760155403, 'longitude': -79.44177395754221}, {'latitude': 43.69858534512708, 'longitude': -79.3419598777498}, {'latitude': 43.705869629062256, 'longitude': -79.52794327480287}, {'latitude': 43.694691138062794, 'longitude': -79.33182766845071}, {'latitude': 43.686228955017505, 'longitude': -79.29916402268613}, {'latitude': 43.69636136736293, 'longitude': -79.31480839681261}, {'latitude': 43.69267322582607, 'longitude': -79.5218122199015}, {'latitude': 43.700438655529595, 'longitude': -79.56299138290333}, {'latitude': 43.68923757167598, 'longitude': -79.3226974412786}, {'latitude': 43.68918158303557, 'longitude': -79.46541446954805}, {'latitude': 43.68755890102059, 'longitude': -79.48228296382206}, {'latitude': 43.69751389863822, 'longitude': -79.45551894993105}, {'latitude': 43.69803725313713, 'longitude': -79.38099784086118}, {'latitude': 43.68818040766366, 'longitude': -79.51177954672445}, {'latitude': 43.68148136251975, 'longitude': -79.35214693391515}, {'latitude': 43.697280648538076, 'longitude': -79.30596162039602}, {'latitude': 43.69683355265684, 'longitude': -79.31307731918083}, {'latitude': 43.699730623262845, 'longitude': -79.5359091023229}, {'latitude': 43.70615731046562, 'longitude': -79.45398875137664}, {'latitude': 43.687283058022444, 'longitude': -79.4423026724572}, {'latitude': 43.6828820945612, 'longitude': -79.51868577580484}, {'latitude': 43.68923159899648, 'longitude': -79.46727905370071}, {'latitude': 43.70072350535867, 'longitude': -79.45144500959998}, {'latitude': 43.68951398413865, 'longitude': -79.49648628157668}, {'latitude': 43.696086690274576, 'longitude': -79.39864982623351}, {'latitude': 43.68407294108391, 'longitude': -79.56662136047284}, {'latitude': 43.70297901018669, 'longitude': -79.45252730228803}, {'latitude': 43.699110318342946, 'longitude': -79.51332821366212}, {'latitude': 43.684425270087196, 'longitude': -79.44483236436025}, {'latitude': 43.700424781202294, 'longitude': -79.49104846470452}, {'latitude': 43.68149482121825, 'longitude': -79.46716477830914}, {'latitude': 43.68506405199152, 'longitude': -79.30152153878467}, {'latitude': 43.68932840028627, 'longitude': -79.29381221971664}, {'latitude': 43.703839003133226, 'longitude': -79.37376986973713}, {'latitude': 43.69390611275881, 'longitude': -79.56372701174102}, {'latitude': 43.68862699872694, 'longitude': -79.4397843817072}, {'latitude': 43.70061226400148, 'longitude': -79.332313214289}, {'latitude': 43.68438719141738, 'longitude': -79.47403364853089}, {'latitude': 43.692360085526815, 'longitude': -79.3713914521534}, {'latitude': 43.69718916081818, 'longitude': -79.52007511551939}, {'latitude': 43.68486174202222, 'longitude': -79.41230704754489}, {'latitude': 43.68076338553424, 'longitude': -79.52908202688633}, {'latitude': 43.70030299860261, 'longitude': -79.36061691193535}, {'latitude': 43.695886833330405, 'longitude': -79.33595833281728}, {'latitude': 43.68946540416304, 'longitude': -79.45739746125196}, {'latitude': 43.691693992523234, 'longitude': -79.47869939320017}, {'latitude': 43.68062686648034, 'longitude': -79.37872308632852}, {'latitude': 43.703385936063015, 'longitude': -79.56157372468783}, {'latitude': 43.69792250581287, 'longitude': -79.5622063736453}, {'latitude': 43.705070328082336, 'longitude': -79.53647146647332}, {'latitude': 43.693356365549604, 'longitude': -79.44748868979082}, {'latitude': 43.70090087586712, 'longitude': -79.3692960406968}, {'latitude': 43.68377537689587, 'longitude': -79.44812866559714}, {'latitude': 43.68015952444572, 'longitude': -79.52854806464029}, {'latitude': 43.6913835460432, 'longitude': -79.40264194759108}, {'latitude': 43.69979659010304, 'longitude': -79.3256578850186}, {'latitude': 43.703278118558764, 'longitude': -79.42121747708431}, {'latitude': 43.688285319514435, 'longitude': -79.39784188595358}, {'latitude': 43.695039376962384, 'longitude': -79.5548527842588}, {'latitude': 43.68900098267149, 'longitude': -79.3087242072719}, {'latitude': 43.68329245277202, 'longitude': -79.42132064861983}, {'latitude': 43.69869269357198, 'longitude': -79.47863210681392}, {'latitude': 43.699801488684436, 'longitude': -79.52870981444042}, {'latitude': 43.691275918054245, 'longitude': -79.44884054932263}, {'latitude': 43.69802308948952, 'longitude': -79.44278223566255}]


    constructor () {
        this.express = express()
        this.mountRoutes()
    }

    private euclidianDistance (row1, row2): number {
        var distance = 0.0
        for (let i = 0; i < row1.length; i++) {
            distance += Math.pow((row1[i] - row2[i]), 2)
        }
        distance = Math.sqrt(distance)
        return distance
    }

    private numNearest (list): number {
        var nearest = 0
        var origin = [list[0].latitude, list[0].longitude]
        let distancelist: number[] = []
        for (let i = 0; i < list.length; i++) {
            distancelist.push(this.euclidianDistance(origin, [list[i].latitude, list[i].longitude]))
        }
        console.log(distancelist)
        return nearest
    }

    private mountRoutes (): void {
        const router = express.Router()

        let mongodb
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://Thani:2sNQqGhEip8uVV4@covidstalker-g15s2.gcp.mongodb.net/test?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

        client.connect(err => {
            mongodb = client.db("LocationDatabase")
            // perform actions on the collection object
        });

        var locationPoller = function (req, res, next) {
            var tempObj = req.body;
            console.log(req);
            console.log(tempObj)
            mongodb.collection("UserLocations").updateOne({}, {
                $set: {
                    'user_id': tempObj.user_id,
                    'latitude': tempObj.latitude, 
                    'longitude': tempObj.longitude, 
                    'lastModifiedDate': new Date().getDate()
                }
            }, function (err, result) {
                if (err)  {
                    res.status(500);
                    throw err;
                } else {
                    mongodb.collection("UserLocations").ensureIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 3600 } )
                    next()
                }
            });
        }

        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
            this.numNearest(this.locationList)
            this.calculate(this.locationList[297].latitude, this.locationList[297].longitude)
        })

        router.post('/poll_location/', function (req, res) {
            console.log(req.body, "hello");
            var tempObj = req.body;

            // mongodb.collection("UserLocations").updateOne({}, {
            //     $set: {
            //         'user_id': tempObj.user_id,
            //         'latitude': tempObj.latitude, 
            //         'longitude': tempObj.longitude, 
            //         'lastModifiedDate': new Date().getDate()
            //     }
            // }, function (err, result) {
            //     if (err)  {
            //         res.status(500);
            //         throw err;
            //     }
            // });
            // mongodb.collection("UserLocations").ensureIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 3600 } )
            res.status(200);
        });

        this.express.use('/', router)
    }

    private haversine (lat1,lat2,lng1,lng2): number {
        console.log(lat1, lat2, lng1, lng2)
        var rad = 6372.8;
        var deltaLat = this.toRad(lat2-lat1);
        var deltaLng = this.toRad(lng2-lng1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);
        var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.sin(deltaLng/2) * Math.sin(deltaLng/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return  rad * c;
    }

    private toRad(degrees): number {
        return degrees * (Math.PI/180);
    }

    // 43.662896, -79.395437
    // radius 50 - 500
    private calculate(user_lat, user_lon): void {
        var count = 0;
        for (let i = 0; i < this.locationList.length; i++) {
            var dist_to_point = this.haversine(user_lat, this.locationList[i].latitude, user_lon, this.locationList[i].longitude);
            console.log ("dist_to_point of index " + i + " is: " + dist_to_point);
            if (dist_to_point <= 0.51){
                console.log ("latitude: " + this.locationList[i].latitude + " longitute: " + this.locationList[i].longitude);
                console.log ("this index is within 500 m: " + i);
                count += 1;
            }
        }
        console.log("There are " + count + " people within a 500 m radius.") //return count instead.
    }
}

export default new App().express
