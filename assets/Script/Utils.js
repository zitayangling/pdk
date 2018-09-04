// var m_ddzHelper = require('ddz_helper_client');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...


    },


    getHeadImg: function (url, nodeFor) {
        if (url === null || url === "") return;

        cc.loader.load({ url: "http://" + url, type: "jpg" }, function (err, tex) {
            // var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(-5, -2, 380, 500));
            nodeFor.spriteFrame = spriteFrame;
        });
    },
    getWEMImg: function (url, nodeFor) {
        if (url === null || url === "") return;

        cc.loader.load({ url: "http://" + url, type: "jpg" }, function (err, tex) {
            // var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(-117, -40, 250, 250));
            nodeFor.spriteFrame = spriteFrame;
        });
    },
    getWXImg: function (url, nodeFor) {
        if (url === null || url === "") return;

        cc.loader.load({ url: "http://" + url, type: "jpg" }, function (err, tex) {
            // var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(172, 82, 151, 145));
            nodeFor.spriteFrame = spriteFrame;
        });
    },
    getZFBImg: function (url, nodeFor) {
        if (url === null || url === "") return;

        cc.loader.load({ url: "http://" + url, type: "jpg" }, function (err, tex) {
            // var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(-129, 82, 151, 145));
            nodeFor.spriteFrame = spriteFrame;
        });
    },
    getAlertImg: function (url, nodeFor) {
        if (url === null || url === "") return;

        cc.loader.load({ url: "http://" + url, type: "jpg" }, function (err, tex) {
            // var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, 200, 200));
            nodeFor.spriteFrame = spriteFrame;
        });
    },

    addClickEvent: function (node, target, component, handler) {
        // console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

    addSlideEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var slideEvents = node.parent.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
        // cc.log(eventHandler);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    logInScreen: function (_log) {
        var _logNode = cc.find("lab");
        if (_logNode !== null) {
            var _label = _logNode.getComponent('cc.Label');
            if (_label !== null)
                _label.string = _log;
        }
    },

    playOpenAnimation(transform) {
        if (transform) {
            transform.active = true;
            transform.scaleX = transform.scaleY = 0.01;
            var action = cc.scaleTo(0.3, 1);
            action.easing(cc.easeBackOut());
            // 执行动作
            transform.runAction(action);
        }
    },

    RefeshMainView: function () {
        var _canvas = cc.find("Canvas");
        if (_canvas !== null) {
            var _mainView = _canvas.getComponent('main');
            if (_mainView !== null)
                _mainView.initView();
        }
    },

    shakeTheScreen: function () {
        var _canvas = cc.find("Canvas/NodeRoot");
        var _sdis = 7;
        var _stime = 0.06;
        if (_canvas !== null) {
            _canvas.runAction(cc.repeat(
                cc.sequence(
                    // cc.moveTo(_stime, cc.p(_sdis, _sdis)),
                    // cc.moveTo(_stime, cc.p(-1 * _sdis, -1 * _sdis)),
                    cc.moveTo(_stime, cc.p(-1 * _sdis, 0)),
                    cc.moveTo(_stime, cc.p(_sdis, 0)),
                    cc.moveTo(_stime, cc.p(0, 0)),
                ), 5
            ));
        }
    },

    enterScene: function () {
        switch (cc.vv.userMgr.gameType) {
            case "pwz":
                cc.director.loadScene("hall");
                break;
            case "ddz":
                cc.director.loadScene("hall_ddz");
                break;
            case "zjh":
                cc.director.loadScene("hall_zjh");
                break;
            case "mj":
                cc.director.loadScene("hall_mj");
                break;
        }
    },


    //  -1                    未知错误
    // 0                     执行成功
    // 1                     无效参数
    // 1088                  用户不在游戏中
    // 1089                  未找到指定的服务器
    // 1090                  通讯失败
    // 1091                  重新登陆
    // 1092                  已经签名
    // 1093                  获取用户核心数据失败
    // 1094                  已经分享奖励
    // 2000                  房间已满
    // 2001                  房卡不足
    // 2002                  重复登陆
    // 2003                  用户未登陆(通常由于服务器方重启，客户端未重新登陆)
    // 2004                  房间不存在
    // 2005                  金币不足,无法进入
    // 2006                  玩家已经在房间中，无法创建私有房间
    getErrorStringByCode: function (_errorCode) {
        switch (_errorCode) {
            case -1:
                return "未知错误";
            case 1:
                return "无效参数";
            case 1088:
                return "用户不在游戏中";
            case 1089:
                return "未找到指定的服务器";
            case 1090:
                return "通讯失败";
            case 1091:
                return "重新登陆";
            case 1092:
                return "已经签名";
            case 1093:
                return "获取用户核心数据失败";
            case 1094:
                return "已经分享奖励";
            case 2000:
                return "房间已满";
            case 2001:
                return "房卡不足";
            case 2002:
                return "重复登陆";
            case 2003:
                return "用户未登陆";
            case 2004:
                return "房间不存在";
            case 2005:
                return "金币不足,无法进入";
            case 2006:
                return "玩家已经在房间中，无法创建私有房间";
        }
        return "未知错误,错误码: " + _errorCode;

    },
    //显示错误消息
    showErrorInfoByErrorCode: function (_errorCode) {
        var info = this.getErrorStringByCode(_errorCode);
        cc.vv.nl.show(info);
    },


    getMsgByMsgIndex: function (_msgIndex) {
        switch (_msgIndex) {
            case '1':
                return "不好意思啊 我要离开一会儿";
            case '2':
                return "合作愉快";
            case '3':
                return "快啊 麻溜儿利索地";
            case '4':
                return "快点儿啊 我等的花都谢了";
            case '5':
                return "你这牌打的也忒好啦";
            case '6':
                return "又掉线儿了 网络怎么这么差 啊";
            case '7':
                return "这把我牌大 都小心点";

        }
        return "";
    },

    StopAllDirEffect: function () {
        var _dir = cc.find("Canvas/NodeRoot/dir");
        var _dong = _dir.getChildByName('dong');
        if (_dong) {
            _dong.color = new cc.Color(255, 255, 255);
            _dong.stopAllActions();
        }
        var _nan = _dir.getChildByName('nan');
        if (_nan) {
            _nan.color = new cc.Color(255, 255, 255);
            _nan.stopAllActions();
        }
        var _xi = _dir.getChildByName('xi');
        if (_xi) {
            _xi.color = new cc.Color(255, 255, 255);
            _xi.stopAllActions();
        }
        var _bei = _dir.getChildByName('bei');
        if (_bei) {
            _bei.color = new cc.Color(255, 255, 255);
            _bei.stopAllActions();
        }
    },
    PlayDirEffect: function (_dirname) {
        this.StopAllDirEffect();
        var _dir = cc.find("Canvas/NodeRoot/dir");
        var _dirsprite = _dir.getChildByName(_dirname);
        if (_dirsprite != null) {
            _dirsprite.runAction(cc.repeatForever(
                cc.sequence(
                    // cc.moveTo(_stime, cc.p(_sdis, _sdis)),
                    // cc.moveTo(_stime, cc.p(-1 * _sdis, -1 * _sdis)),
                    cc.tintTo(0.3, 146, 142, 142),
                    cc.tintTo(0.3, 255, 255, 255),
                )
            ));
        }
    },
    clearChildren: function (_node) {
        if (_node == null) return;
        for (var i in _node.children) {
            _node.children[i].destroy();
            i--;
        }
    },
    getDetailsUrl(_url, _sty) {
        console.log("_sty =====" + _sty);
        cc.vv.wc.hide();
        if (!_url) {
            cc.vv.nl.show("上传失败！");
            return;
        }
        if (_sty == 3) { //上传的凭证          
            cc.vv.userMgr.details = _url;
            cc.find("Canvas/lay_business").getComponent("JiaoYi").onClickRecord();
            var self = this;
            cc.vv.http.sendRequest("/platform/uploadVoucher", { userId: cc.vv.userMgr.account.id, orderDetailId: cc.vv.userMgr.orderId, path: _url, key: cc.vv.userMgr.key }, function (ret) {
                if (ret.ec) {
                    cc.vv.nl.show(ret.msg);
                } else {
                    cc.log(ret);
                    cc.vv.alert.show("溫馨提示", "上传成功！", true, false, false);
                    cc.log("上傳服務器成功！");
                    // cc.vv.userMgr.details = ret.path;
                }
            });
            return;
        }
        // cc.vv.nl.show("上传成功！");
        this.scheduleOnce(function(){
            cc.vv.alert.show("溫馨提示", "上传成功！", true, false, false);
        },0.5);
        if (_sty == 1) { //上传的支付宝二维码
            cc.vv.userMgr.zfbUrl = _url;
            cc.vv.userMgr.account.bankNumber = _url;
            console.log("上傳支付宝二维码成功！");
        }else if (_sty == 2) { //上传的微信二维码
            cc.vv.userMgr.wxUrl = _url;
            cc.vv.userMgr.account.weixinUrl = _url;
            console.log("上傳微信二维码成功！");
        }

    },
    cancelUpdataPic(){
        cc.vv.wc.hide();
    },
    updataErrorPic(){
        cc.vv.wc.hide();
        this.scheduleOnce(function(){
            cc.vv.alert.show("溫馨提示", "上传失败,请重新上传！", true, false, false);
        },0.5);
    },
});
