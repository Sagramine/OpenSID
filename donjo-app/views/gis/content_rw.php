<div id="isi_popup_rw">
	<?php foreach ($rw_gis as $key_rw => $rw): ?>
		<div id="isi_popup_rw_<?= $key_rw ?>" style="visibility: hidden;">
			<div id="content_<?= $key_rw ?>">
				<center><h4 id="firstHeading" class="firstHeading">Wilayah RW <?= $rw['rw'] . " " . ucwords($this->setting->sebutan_dusun) . " " . $rw['dusun']?></h4></center>
				<div id="bodyContent_<?= $key_rw ?>">
					<p><center><a href="#collapseStat_<?= $key_rw ?>" class="btn btn-social btn-flat bg-navy btn-sm visible-xs-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block" title="Statistik Penduduk" data-toggle="collapse" data-target="#collapseStat_<?= $key_rw ?>" aria-expanded="false" aria-controls="collapseStat"><i class="fa  fa-bar-chart"></i>Statistik Penduduk RW <?= $rw['rw'] ?></a></center></p>
					<div class="collapse box-body no-padding" id="collapseStat_<?= $key_rw ?>">
						<div class="card card-body">
							<?php foreach ($list_lap as $key => $value): ?>
								<li class="<?php ($lap==$key) and print('active') ?>"><a href='<?=site_url("statistik/pie_gis_rw/2/$key/".trim($rw[dusun])."/".trim($rw[rw]))?>' data-remote="false" data-toggle="modal" data-target="#modalBox" data-title="Statistik Penduduk RW <?= $rw['rw'] ?>"><?= $value ?></a></li>
							<?php endforeach; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>
