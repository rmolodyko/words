<?php

class SetController extends Controller
{
	public $layout='main';
	public $defaultAction = 'show';

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
		$dataProvider = new CActiveDataProvider('Set',array(
			'criteria'=>array(
				'condition'=>'id_user = :idv',
				'params' => array(':idv'=>Yii::app()->user->id)
			)));
		$this->render('show',['dataProvider'=>$dataProvider]);
	}

	public function actionCreateSet($name){
		$isSet = Set::model()->findByAttributes(['title'=>$name]);
		if($isSet != null){
			throw new Exception("Error Processing Request", 1);
		}else{
			$set = new Set;
			$set->title = $name;
			$set->id_user = Yii::app()->user->getId();
			if(!$set->save()){
				throw new Exception("Error Processing Request", 1);
			}else{
				$this->redirect(array('set/show'));
			}
		}
	}

	public function actionEditName($id_set,$new_name){
		$set = Set::model()->findByAttributes(['id'=>$id_set]);
		if($set != null){
			$set->title = $new_name; 
			if($set->save()){
				die('["ok"]');
			}
		}
		throw new Exception("Error Processing Request", 1);
	}

	public function actionDeleteSet($set){
		try{
			Translate::model()->deleteAllByAttributes(['id_set'=>(int)$set]);
			Word::model()->deleteAllByAttributes(['id_set'=>(int)$set]);
			Set::model()->deleteAllByAttributes(['id'=>(int)$set]);
			$this->redirect(array('set/show'));
		}catch(Exception $e){
			throw new Exception("Error Processing Request", 1);
		}
	}
}