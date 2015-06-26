<?php

class TrainController extends Controller
{
	public $layout='main';
	public $defaultAction = 'show';

	private $limitWTWordOnPage = 10;
	private $limitWTTranslateOnPage = 5;

	public function accessRules()
    {
        return array(
            array('deny',
                'actions'=>array(),
                'users'=>array('?'),
            ));
    }

    public function filters()
    {
        return array(
            'accessControl',
        );
    }

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionShow()
	{
		$listOfSet = Set::model()->findAll();
		//$this->createWT(1);
		$this->render('show',['sets'=>$listOfSet]);
	}

	public function actionDo($set,$mode)
	{
		$set = Set::model()->findByAttributes(['id'=>(int)$set]);
		if($mode == 'wt' || $mode == 'tw'){
			$this->render('train',['set_name'=>$set->title]);
		}else{
			$this->render('train2',['set_name'=>$set->title]);
		}
	}

	public function actionCreateWT($set,$mode){
		$criteria = new CDbCriteria;
		$criteria->limit = $this->limitWTWordOnPage;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		if($mode == 'wt'){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_wt = 0');
		}else if($mode == 'tw'){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_tw = 0');
		}
		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			if($mode == 'wt'){
				$criteriaTR = new CDbCriteria;
				$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
				$criteriaTR->select = array('id','translate');
				$criteriaTR->order = 'RAND()';
				$criteriaTR->addCondition('id_set = '.((int)$set).' AND id_word != '.$v->id);
				$trRand = Translate::model()->findAll($criteriaTR);
				$trArray = [];
				foreach ($trRand as $key => $value){
					$trArray[] = ['id'=>$value->id,'item'=>$value->translate,'is_true'=>"wrong"];
				}
				$trTrue = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$v->id]);

				$trTrue = ['id'=>$trTrue->id,'item'=>$trTrue->translate,'is_true'=>"right"];
				$trArray[] = $trTrue;
				shuffle($trArray);
				$result[] = ['id'=>$v->id,'first'=>$v->word,'second'=>$trArray];
			}else if($mode == 'tw'){
				$trMain = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$v->id]);
				$criteriaTR = new CDbCriteria;
				$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
				$criteriaTR->select = array('id','word');
				$criteriaTR->order = 'RAND()';
				$criteriaTR->addCondition('id_set = '.((int)$set).' AND id != '.$v->id);
				$trRand = Word::model()->findAll($criteriaTR);
				$trArray = [];
				foreach ($trRand as $key => $value){
					$trArray[] = ['id'=>$value->id,'item'=>$value->word,'is_true'=>"wrong"];
				}
				$trTrue = ['id'=>$v->id,'item'=>$v->word,'is_true'=>"right"];
				$trArray[] = $trTrue;
				shuffle($trArray);
				//id всегда id "word"
				$result[] = ['id'=>$v->id,'first'=>$trMain->translate,'second'=>$trArray];
			}
		}
		
		die(json_encode($result));
	}

	/*public function actionCreateTW($set){
		$criteria = new CDbCriteria;
		$criteria->limit = $this->limitWTWordOnPage;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		$criteria->addCondition('id_set = '.((int)$set).' AND status_wt = 0');

		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			
		}
		//die('[{"type":"wt","data":"hello","id":"4CE2889A-FC3B-4AD5-80F9-83D1B31EC8FA"}]');
		//'[{"data":"hello","id":"4C31C2E8-A0E1-4714-8F2C-2E49F1FCAE0B","type":"wt"}]'
		die(json_encode($result));
	}

	public function actionWt($set){
		//$data = $this->createWT($set);
		$data = "";
		$set = Set::model()->findByAttributes(['id'=>(int)$set]);
		$this->render('train',['data'=>$data,'set_name'=>$set->title]);
	}

	public function actionTw($set){
		$data = $this->createTW($set);
		$set = Set::model()->findByAttributes(['id'=>(int)$set]);
		$this->render('wt',['data'=>$data,'set_name'=>$set->title]);
	}*/

	public function actionCreateWrite($set,$mode){
		$criteria = new CDbCriteria;
		$criteria->limit = $this->limitWTWordOnPage;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		if($mode == 'vr'){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_speech = 0');
		}else if($mode == 'tr'){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_spell = 0');
		}
		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			$trMain = Translate::model()->findAllByAttributes(['id_set'=>(int)$set,'id_word'=>$v->id]);
			$trs = [];
			foreach ($trMain as $key => $value){
				$trs[] = $value->translate;
			}
			$result[] = ['id'=>$v->id,'first'=>$v->word,'second'=>$trs];
		}
		die(json_encode($result));
	}

	public function actionSave($data,$mode){
		$data = json_decode($data);
		foreach($data as $key => $value){
			$word = Word::model()->findByAttributes(["id"=>$value->word_id]);
			switch ($mode){
				case 'wt':
					$word->status_wt = (int)$value->answ;
					break;
				case 'tw':
					$word->status_tw = (int)$value->answ;
					break;
				case 'vr':
					$word->status_speech= (int)$value->answ;
					break;
				case 'tr':
					$word->status_spell = (int)$value->answ;
					break;
				default:
					throw new Exception("Error Processing Request", 1);
					break;
			}
			if(!$word->save()){
				throw new Exception("Error Processing Request", 1);
			}
		}
		die('["ok"]');
	}

	public function actionResetTrain($set){
		$wordAll = Word::model()->findAllByAttributes(["id_set"=>(int)$set]);
		foreach($wordAll as $key => $word){
			$word->status_wt = 0;
			$word->status_tw = 0;
			$word->status_spell = 0;
			$word->status_speech = 0;
			if(!$word->save()){
				throw new Exception("Error Processing Request", 1);
			}
		}
		$this->redirect(array('train/show'));
	}
}