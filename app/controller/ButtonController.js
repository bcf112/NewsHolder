Ext.define('NewsHolder.controller.ButtonController', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			feedIcon : "#feedIcon",
			homeButton : "#homeButton",
			articleScrapButton : "#articleScrapButton",
			mainSearchButton : "#mainSearchButton",
		},

		control : {
			'#article_font_size_up' : {
				tap : 'font_size_up'
			},
			'#article_font_size_down' : {
				tap : 'font_size_down'
			},
			homeButton : {
				tap : "homeButtonTap",
			},
			articleScrapButton : {
				tap : "articleScrapButtonTap",
			},
			mainSearchButton : {
				tap : "mainSearchButtonTap",
			},
		}
	},

	/** 왼쪽 상단의 홈 버튼을 눌렀을 때 */
	homeButtonTap : function(button, event) {
		var ArticleController = this.getApplication().getController(
				"ArticleController");
		ArticleController.getList().deselectAll();
		
		animation.onMoveSlideRight('NewsHolder', 'rssMainPanel', [ 'homeButton',
				'articleScrapButton', 'registerKeywordButton' ],
				[ 'mainSearchButton' ]);
	},

	/** 기사 화면에서 오른쪽 상단의 스크랩 버튼을 눌렀을 때 */
	articleScrapButtonTap : function(button, event) {

		var data = Ext.getCmp("articleContent")._data;
		var scrapDate = Date();
		var scrapStore = Ext.getStore('Scraps');

		Ext.Msg.confirm('확인', '이 기사를 스크랩 하시겠습니까?', function(buttonId, value,
				opt) {
			if (buttonId == 'yes') {
				if (scrapStore.find('title', data.title) > -1) { // 중복확인
					Ext.Msg.alert('알림', '해당 기사가 이미 등록되어있습니다.', Ext.emptyFn);
				} else {
					scrapStore.add({
						title : data.title,
						description : data.description,
						pubDate : data.pubDate,
						scrapDate : scrapDate,
						link : data.link
					});
					scrapStore.sync();
					Ext.Msg.alert('알림', '스크랩이 완료되었습니다.', Ext.emptyFn);
				}
			}
		}, this);
	},

	/** 오른쪽 상단의 검색 버튼을 눌렀을 때 */
	mainSearchButtonTap : function(button, event) {
		animation.onMoveSlideLeft('키워드 검색', 'keywordPanel',
				[ 'mainSearchButton' ], [ 'homeButton' ]);
		this.getApplication().getController("KeywordSearchController")
				.resetModifiedComponent();

		localStorage.History_navigator = "Search";
	},
});