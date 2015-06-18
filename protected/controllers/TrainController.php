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

	public function createWT($set){
		$criteria = new CDbCriteria;
		$criteria->limit = $this->limitWTWordOnPage;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		$criteria->addCondition('id_set = '.((int)$set).' AND status_wt = 0');

		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			$criteriaTR = new CDbCriteria;
			$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
			$criteriaTR->select = array('id','translate');
			$criteriaTR->order = 'RAND()';
			$criteriaTR->addCondition('id_set = '.((int)$set).' AND id_word != '.$v->id);
			$trRand = Translate::model()->findAll($criteriaTR);
			$trArray = [];
			foreach ($trRand as $key => $value){
				$trArray[] = ['id'=>$value->id,'tr'=>$value->translate,'is_true'=>"wrong"];
			}
			$trTrue = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$v->id]);

			$trTrue = ['id'=>$trTrue->id,'tr'=>$trTrue->translate,'is_true'=>"right"];
			$trArray[] = $trTrue;
			shuffle($trArray);
			$result[] = ['type'=>'wt','data'=>['id'=>$v->id,'word'=>$v->word,'translate'=>$trArray]];
		}
		return json_encode($result);
	}

	public function createTW($set){
		$criteria = new CDbCriteria;
		$criteria->limit = $this->limitWTWordOnPage;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		$criteria->addCondition('id_set = '.((int)$set).' AND status_wt = 0');

		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			$trMain = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$v->id]);
			$criteriaTR = new CDbCriteria;
			$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
			$criteriaTR->select = array('id','word');
			$criteriaTR->order = 'RAND()';
			$criteriaTR->addCondition('id_set = '.((int)$set).' AND id != '.$v->id);
			$trRand = Word::model()->findAll($criteriaTR);
			$trArray = [];
			foreach ($trRand as $key => $value){
				$trArray[] = ['id'=>$value->id,'word'=>$value->word,'is_true'=>"wrong"];
			}
			$trTrue = ['id'=>$v->id,'word'=>$v->word,'is_true'=>"right"];
			$trArray[] = $trTrue;
			shuffle($trArray);
			$result[] = ['type'=>'tw','data'=>['id'=>$trMain->id,'translate'=>$trMain->translate,'word'=>$trArray]];
		}
		return json_encode($result);
	}

	public function actionWt($set){
		$data = $this->createWT($set);
		$set = Set::model()->findByAttributes(['id'=>(int)$set]);
		$this->render('wt',['data'=>$data,'set_name'=>$set->title]);
	}

	public function actionTw($set){
		$data = $this->createTW($set);
		$set = Set::model()->findByAttributes(['id'=>(int)$set]);
		$this->render('wt',['data'=>$data,'set_name'=>$set->title]);
	}

	public function actionSave($data){
		$data = json_decode($data);
		foreach($data as $key => $value){
			$word = Word::model()->findByAttributes(["id"=>$value->word_id]);
			$word->status_wt = (int)$value->answ;
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