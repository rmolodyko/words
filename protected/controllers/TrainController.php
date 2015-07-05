<?php

class TrainController extends Controller
{
	public $layout='main';
	public $defaultAction = 'show';

	const MODE_WORD_TO_TRANSLATE = 'wt';
	const MODE_TRANSLATE_TO_WORD = 'tw';
	const MODE_SPEECH = 'sw';
	const MODE_SPELL = 'pw';
	const MODE_BRAIN_STORM = 'bs';

	public $allowModes = [self::MODE_TRANSLATE_TO_WORD,self::MODE_SPELL,self::MODE_SPEECH,self::MODE_WORD_TO_TRANSLATE];

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
		if($mode == self::MODE_WORD_TO_TRANSLATE || $mode == self::MODE_TRANSLATE_TO_WORD){
			$this->render('train3',['set_name'=>$set->title]);
		}else{
			$this->render('train3',['set_name'=>$set->title]);
		}
	}

	//Gets data for training
	public function actionGetData($set,$mode){
		$result = $this->getData($set,$mode,$this->limitWTWordOnPage);
		die(json_encode($result));
	}

	//Get all data
	public function getData($set,$mode,$limit){
		$result = [];
		switch($mode){
			case self::MODE_WORD_TO_TRANSLATE:
			case self::MODE_TRANSLATE_TO_WORD:
				$result = $this->getDataSimpleMode($set,$mode,$limit);
				break;

			case self::MODE_SPEECH:
			case self::MODE_SPELL:
				$result = $this->getDataSoundMode($set,$mode,$limit);
				break;

			case self::MODE_BRAIN_STORM:
				$result = $this->getDataBrainStorm($set);
				break;
		}
		return $result;
	}

	//TODO remove key id from result data because it already exists
	function getSpecifiedDataByWord($set,$mode,$id,$word){
		$result = null;
		if($mode == self::MODE_WORD_TO_TRANSLATE){
			$criteriaTR = new CDbCriteria;
			$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
			$criteriaTR->select = array('id','translate');
			$criteriaTR->order = 'RAND()';
			$criteriaTR->addCondition('id_set = '.((int)$set).' AND id_word != '.$id);
			$trRand = Translate::model()->findAll($criteriaTR);
			$trArray = [];
			foreach ($trRand as $key => $value){
				$trArray[] = ['id'=>$value->id,'item'=>$value->translate,'is_true'=>"wrong"];
			}
			$trTrue = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$id]);

			$trTrue = ['id'=>$trTrue->id,'item'=>$trTrue->translate,'is_true'=>"right"];
			$trArray[] = $trTrue;
			shuffle($trArray);
			$result = ['id'=>$id,'first'=>$word,'second'=>$trArray];
		}else if($mode == self::MODE_TRANSLATE_TO_WORD){
			$trMain = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$id]);
			$criteriaTR = new CDbCriteria;
			$criteriaTR->limit = $this->limitWTTranslateOnPage-1;
			$criteriaTR->select = array('id','word');
			$criteriaTR->order = 'RAND()';
			$criteriaTR->addCondition('id_set = '.((int)$set).' AND id != '.$id);
			$trRand = Word::model()->findAll($criteriaTR);
			$trArray = [];
			foreach ($trRand as $key => $value){
				$trArray[] = ['id'=>$value->id,'item'=>$value->word,'is_true'=>"wrong"];
			}
			$trTrue = ['id'=>$id,'item'=>$word,'is_true'=>"right"];
			$trArray[] = $trTrue;
			shuffle($trArray);
			//id всегда id "word"
			$result = ['id'=>$id,'first'=>$trMain->translate,'second'=>$trArray];
		}else if($mode == self::MODE_SPELL || $mode == self::MODE_SPEECH){
			$trMain = Translate::model()->findAllByAttributes(['id_set'=>(int)$set,'id_word'=>$id]);
			$trs = [];
			foreach ($trMain as $key => $value){
				$trs[] = $value->translate;
			}
			$result = ['id'=>$id,'first'=>$word,'second'=>$trs];
		}
		return $result;
	}

	function getDataSimpleMode($set,$mode,$limit){
		$criteria = new CDbCriteria;
		$criteria->limit = $limit;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		if($mode == self::MODE_WORD_TO_TRANSLATE){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_wt = 0');
		}else if($mode == self::MODE_TRANSLATE_TO_WORD){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_tw = 0');
		}
		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			$result[$v->id] = $this->getSpecifiedDataByWord($set,$mode,$v->id,$v->word);
		}

		return $result;
	}

	public function getDataSoundMode($set,$mode,$limit){
		$criteria = new CDbCriteria;
		$criteria->limit = $limit;
		$criteria->select = array('id','word');
		$criteria->order = 'RAND()';
		if($mode == self::MODE_SPEECH){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_speech = 0');
		}else if($mode == self::MODE_SPELL){
			$criteria->addCondition('id_set = '.((int)$set).' AND status_spell = 0');
		}
		$word = Word::model()->findAll($criteria);
		$result = [];
		foreach ($word as $k=>$v){
			$result[$v->id] = $this->getSpecifiedDataByWord($set,$mode,$v->id,$v->word);
		}
		return $result;
	}

	public function getDataBrainStorm($set){
		$limit = 5;
		$result = [];
		foreach($this->allowModes as $v){
			$result[$v] = $this->getData($set,$v,$limit);
		}
		return $result;
	}

	public function actionSave($data,$mode){
		$data = json_decode($data);
		foreach($data as $key => $value){
			$word = Word::model()->findByAttributes(["id"=>$value->word_id]);
			switch ($mode){
				case self::MODE_WORD_TO_TRANSLATE:
					$word->status_wt = (int)$value->answ;
					break;
				case self::MODE_TRANSLATE_TO_WORD:
					$word->status_tw = (int)$value->answ;
					break;
				case self::MODE_SPEECH:
					$word->status_speech= (int)$value->answ;
					break;
				case self::MODE_SPELL:
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